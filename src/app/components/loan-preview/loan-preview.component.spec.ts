import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPreview } from './loan-preview.component';
import { Component, Input, Signal } from '@angular/core';
import { LoanPurposeModel } from '@models/loan-purpose.model';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatError, MatFormField, MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  template: ''
})
class MockProductsComponent {
  @Input() selectedLoanPurposeSignal!: Signal<LoanPurposeModel | null>;
}

@Component({
  selector: 'app-loan-purposes',
  template: ''
})
class MockLoanPurposesComponent {
  @Input() selectedLoanPurposeSignal!: Signal<LoanPurposeModel | null>;
  @Input() amountSignal!: Signal<number | null>;
}

describe('LoanPreview', () => {
  let component: LoanPreview;
  let fixture: ComponentFixture<LoanPreview>;

  beforeEach(async () => {
    registerLocaleData(localeFr);
    await TestBed.configureTestingModule({
      imports: [
        LoanPreview
      ]
    })
    .overrideComponent(LoanPreview, {
      set: {
        imports: [
          MockProductsComponent,
          MockLoanPurposesComponent,
          MatInput, 
          MatError, 
          MatFormField, 
          ReactiveFormsModule
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
