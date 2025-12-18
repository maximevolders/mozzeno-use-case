import { Component, effect, Input, Signal, signal } from '@angular/core';
import { LoanPurposeModel } from '@models/loan-purpose.model';
import { ProductModel } from '@models/product.model';
import { ProductsService } from '@services/products.service';
import { finalize } from 'rxjs';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-products',
  imports: [MatProgressSpinner, MatCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  productLoading = signal(false);
  products: Array<ProductModel> = [];

  @Input()
  selectedLoanPurposeSignal!: Signal<LoanPurposeModel | null>;  
  
  @Input()
  amountSignal!: Signal<number | null>;

  constructor(private productsService: ProductsService) {
    effect(() => {
      const loanPurpose = this.selectedLoanPurposeSignal();
      const amount = this.amountSignal();
      if (loanPurpose && amount) {
        this.getProducts(loanPurpose.id, amount);
      }
    });
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
}
