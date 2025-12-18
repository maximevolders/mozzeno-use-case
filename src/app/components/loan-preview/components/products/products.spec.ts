import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Products } from './products';
import { ProductsService } from '@services/products.service';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;
  let serviceMock: Partial<ProductsService>;

  const mockResponse: Array<Object> = [
      {
        id: 'id1',
        purpose: 'purpose1',
        minimumAmount: 10,
        purposeSplitThresholdAmount: 10,
        maximumAmount: 10,
        averageAmount: 10,
        averageAmountCurrency: 'EUR',
        averageDuration: 10,
        type: 1,
        details: 'details1',
        links: []
      },
      {
        id: 'id2',
        purpose: 'purpose2',
        minimumAmount: 20,
        purposeSplitThresholdAmount: 20,
        maximumAmount: 20,
        averageAmount: 20,
        averageAmountCurrency: 'USD',
        averageDuration: 20,
        type: 2,
        details: 'details2',
        links: []
      }
    ];

  beforeEach(async () => {
    registerLocaleData(localeFr);
    serviceMock =  {
      getProducts: vi.fn().mockReturnValue(of(mockResponse))
    };

    await TestBed.configureTestingModule({
      imports: [Products],
      providers: [
        { provide: ProductsService, useValue: serviceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    component.amountSignal = signal(10);
    component.selectedLoanPurposeSignal = signal(null);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
