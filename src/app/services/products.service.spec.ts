import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('Products', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService, provideHttpClientTesting()]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /products', () => {
    // Input params
    const purposeId = 'id1';
    const amount = 10;

    // Mocked Data
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

    // Assert response
    service.getProducts(purposeId, amount).subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockResponse);
    });

    // Assert request is made
    const request = httpMock.expectOne(request =>
      request.method === 'GET' &&
      request.url === `${environment.apiBaseUrl}/api/products/`
    );

    expect(request.request.params.get('purposeid')).toEqual(purposeId);
    expect(request.request.params.get('amount')).toEqual(amount.toString());
    
    // Simulate API answer
    request.flush(mockResponse);
  });  
});
