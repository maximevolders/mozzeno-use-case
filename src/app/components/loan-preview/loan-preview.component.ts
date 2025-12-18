import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput } from '@angular/material/input';
import { LoanPurposeModel } from '@models/loan-purpose.model';
import { LoanPurposes } from './components/loan-purposes/loan-purposes';
import { Products } from "./components/products/products";
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-loan-preview',
  imports: [LoanPurposes, Products, MatInput, MatError, MatFormField, ReactiveFormsModule],
  templateUrl: './loan-preview.component.html',
  styleUrl: './loan-preview.component.scss'
})
export class LoanPreview implements OnInit, OnDestroy {
  selectedLoanPurposeSignal = signal<LoanPurposeModel | null>(null);
  amountSignal = signal<number | null>(null);
  amountControl = new FormControl<number | null>(null);

  private destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const loanPurpose = this.selectedLoanPurposeSignal();
      if (loanPurpose) {
        this.onLoadPurposeChange(loanPurpose);
      }
    });
  }

  ngOnInit(): void {
    this.amountControl.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => 
      this.amountSignal.set(value)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLoadPurposeChange(loanPurpose: LoanPurposeModel) {
    this.amountControl.setValidators([
          Validators.min(loanPurpose.minimum_amount),
          Validators.max(loanPurpose.maximum_amount)
        ]);
    this.amountControl.updateValueAndValidity();
  }
}
