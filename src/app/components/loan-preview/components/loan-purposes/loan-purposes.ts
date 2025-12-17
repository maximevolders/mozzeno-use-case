import { Component, OnInit, signal } from '@angular/core';
import { LoanPurposesService } from '@services/loan-purposes.service';
import { finalize } from 'rxjs';
import { LoanPurposeModel } from '@models/loan-purpose.model';
import { ProductsService } from '@services/products.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loan-purposes',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatProgressSpinner],
  templateUrl: './loan-purposes.html',
  styleUrl: './loan-purposes.scss',
})
export class LoanPurposes implements OnInit {
  purposesLoading = signal(false);
  productLoading = signal(false);
  purposes: Array<LoanPurposeModel> = [];
  products: Array<Object> = [];

  constructor(private loanPurposesService: LoanPurposesService,
              private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.purposesLoading.set(true);
    this.loanPurposesService.getLoanPurposes()
    .pipe(finalize(() => this.purposesLoading.set(false)))
    .subscribe(data => this.purposes = data);
  }

  onLoadPurposeChange(id: string) {
    this.productLoading.set(true);
    this.productsService.getProducts(id, 10000)
    .pipe(finalize(() => this.productLoading.set(false)))
    .subscribe(data => this.products = data);
  }
}
