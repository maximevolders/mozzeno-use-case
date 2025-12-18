import { Component, effect, Input, Signal, signal, WritableSignal } from '@angular/core';
import { LoanPurposeModel } from '@models/loan-purpose.model';
import { ProductModel } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { finalize } from 'rxjs';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { CommonModule } from '@angular/common';

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

  selectedProductSignal: WritableSignal<ProductModel | null> = signal<ProductModel | null>(null);  
  productLoading = signal(false);
  products: Array<ProductModel> = [];

  constructor(private productsService: ProductsService) {
    effect(() => {
      const loanPurpose = this.selectedLoanPurposeSignal();
      const amount = this.amountSignal();
      if (loanPurpose && amount) {
        this.getProducts(loanPurpose.id, amount);
      }
    });
  }

  onProductChange(item: ProductModel) {
    this.selectedProductSignal.set(item);
  }

  getProducts(loanPurposeId: string, amount: number) {
    if (this.isAmountValid(amount)) {
      this.productLoading.set(true);
        this.productsService.getProducts(loanPurposeId, amount)
        .pipe(finalize(() => this.productLoading.set(false)))
        .subscribe(data => this.products = data);
    }
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
