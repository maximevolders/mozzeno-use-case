import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPurposes } from './loan-purposes';
import { LoanPurposesService } from '@services/loan-purposes.service';
import { of } from 'rxjs';
import { LoanPurposeModel } from '@models/loan-purpose.model';
import { signal } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

describe('LoanPurposes', () => {
  let component: LoanPurposes;
  let fixture: ComponentFixture<LoanPurposes>;
  let serviceMock: Partial<LoanPurposesService>;

  const mockResponse: Array<LoanPurposeModel> = [
        {
          id: 'id1',
          purpose: 'purpose1',
          minimum_amount: 10,
          purpose_split_threshold_amount: 10,
          maximum_amount: 10,
          average_amount: 10,
          average_amount_currency: 'EUR',
          average_duration: 10,
          type: 1,
          details: 'details1',
          links: []
        },
        {
          id: 'id2',
          purpose: 'purpose2',
          minimum_amount: 20,
          purpose_split_threshold_amount: 20,
          maximum_amount: 20,
          average_amount: 20,
          average_amount_currency: 'USD',
          average_duration: 20,
          type: 2,
          details: 'details2',
          links: []
        }
      ];

  beforeEach(async () => {
    registerLocaleData(localeFr);
    serviceMock =  {
          getLoanPurposes: vi.fn().mockReturnValue(of(mockResponse))
        };

    await TestBed.configureTestingModule({
      imports: [LoanPurposes],
      providers: [
        { provide: LoanPurposesService, useValue: serviceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPurposes);
    component = fixture.componentInstance;
    component.selectedLoanPurposeSignal = signal(mockResponse[0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
