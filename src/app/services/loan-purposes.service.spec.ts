import { TestBed } from '@angular/core/testing';
import { LoanPurposesService } from './loan-purposes.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { LoanPurposeModel } from '../model/loan-purpose.model';

describe('LoanPurposes', () => {
  let service: LoanPurposesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanPurposesService, provideHttpClientTesting()]
    });
    service = TestBed.inject(LoanPurposesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /loan-purposes', () => {
    // Mocked Data
    const mockResponse: Array<LoanPurposeModel> = [
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
    service.getLoanPurposes().subscribe(loans => {
      expect(loans.length).toBe(2);
      expect(loans).toEqual(mockResponse);
    });

    // Assert request is made
    const request = httpMock.expectOne(request =>
      request.method === 'GET' &&
      request.url === `${environment.apiBaseUrl}/api/loan-purposes`
    );
    
    // Simulate API answer
    request.flush(mockResponse);
  });  
});
