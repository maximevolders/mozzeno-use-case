import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { LoanPurposesService } from '@services/loan-purposes.service';
import { finalize } from 'rxjs';
import { LoanPurposeModel } from '@models/loan-purpose.model';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-purposes',
  imports: [CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatProgressSpinner],
  templateUrl: './loan-purposes.html',
  styleUrl: './loan-purposes.scss',
})
export class LoanPurposes implements OnInit {
  
  @Input()
  selectedLoanPurposeSignal!: WritableSignal<LoanPurposeModel | null>;

  purposesLoading = signal(false);
  purposes: Array<LoanPurposeModel> = [];

  constructor(private loanPurposesService: LoanPurposesService
  ) {}

  ngOnInit(): void {
    this.purposesLoading.set(true);
    this.loanPurposesService.getLoanPurposes()
    .pipe(finalize(() => this.purposesLoading.set(false)))
    .subscribe(data => this.purposes = data);
  }

  onLoadPurposeChange(item: LoanPurposeModel) {
    this.selectedLoanPurposeSignal.set(item);
  }
}
