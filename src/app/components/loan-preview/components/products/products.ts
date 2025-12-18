import { Component, effect, Input, Signal, signal, WritableSignal } from '@angular/core';
import { LoanPurposeModel } from '@models/loan-purpose.model';
import { ProductModel } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { finalize } from 'rxjs';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { ComputedProductModel } from '@models/computed-product.model';

@Component({
  selector: 'app-products',
  imports: [CommonModule, MatProgressSpinner, MatCard, MatCardHeader, MatCardTitle, MatCardContent],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {

  @Input()
  selectedLoanPurposeSignal!: Signal<LoanPurposeModel | null>;  
  
  @Input()
  amountSignal!: Signal<number | null>;

  selectedProductSignal: WritableSignal<string | null> = signal<string | null>(null);  
  productLoading = signal(false);
  products: Array<ComputedProductModel> = [];

  constructor(private productsService: ProductsService) {
    effect(() => {
      const loanPurpose = this.selectedLoanPurposeSignal();
      const amount = this.amountSignal();
      if (loanPurpose && amount) {
        this.getProducts(loanPurpose.id, amount);
      }
    });
  }

  onProductChange(item: ComputedProductModel) {
    this.selectedProductSignal.set(item.id);
  }

  getProducts(loanPurposeId: string, amount: number) {
    if (this.isAmountValid(amount)) {
      this.productLoading.set(true);
        this.productsService.getProducts(loanPurposeId, amount)
        .pipe(finalize(() => this.productLoading.set(false)))
        .subscribe(data => this.computeProducts(data));
    }
  }

  computeProducts(data: Array<ProductModel>) {
    this.products = Object.values(
      data.reduce((acc, val) => {
        if (!acc[val.id]) {
          acc[val.id] = {
            id: val.id,
            duration: val.duration,
            min_rate: val.rate_apr,
            max_rate: val.rate_apr,
            min_instalment_amount: val.instalment_amount,
            max_instalment_amount: val.instalment_amount,
            min_total_payment: val.instalment_amount * val.duration,
            max_total_payment: val.instalment_amount * val.duration
          };
        } else {
          acc[val.id].min_rate = Math.min(acc[val.id].min_rate, val.rate_apr);
          acc[val.id].min_instalment_amount = Math.min(acc[val.id].min_instalment_amount, val.instalment_amount);
          acc[val.id].min_total_payment = Math.min(acc[val.id].min_total_payment, val.instalment_amount * val.duration);

          acc[val.id].max_rate = Math.max(acc[val.id].max_rate, val.rate_apr);
          acc[val.id].max_instalment_amount = Math.max(acc[val.id].max_instalment_amount, val.instalment_amount);
          acc[val.id].max_total_payment = Math.max(acc[val.id].max_total_payment, val.instalment_amount * val.duration);
        }
        return acc;
      }, {} as Record<string, ComputedProductModel>)
    ).sort((a, b) => a.min_instalment_amount - b.min_instalment_amount);
  }

  isAmountValid(amount: number): boolean {
    const loanPurpose = this.selectedLoanPurposeSignal();
    return !!loanPurpose && !!amount 
      && amount >= loanPurpose.minimum_amount && amount <= loanPurpose.maximum_amount;
  }

  getTotalPayment(monthlyPayment: number, duration: number): number {
    return monthlyPayment * duration;
  }
}
