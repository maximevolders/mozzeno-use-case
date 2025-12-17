import { TestBed } from '@angular/core/testing';
import { LoanPurposesService } from './loan-purposes.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { LoanPurposeModel } from '@models/loan-purpose.model';

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
