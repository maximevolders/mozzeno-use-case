import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { Observable } from 'rxjs';
import { LoanPurposeModel } from '../model/loan-purpose.model';

@Injectable({
  providedIn: 'root',
})
export class LoanPurposesService extends ApiBaseService {

  private readonly endpoint = `${this.baseUrl}/loan-purposes`;
  
  getLoanPurposes(): Observable<Array<LoanPurposeModel>> {
    return this.httpClient.get<Array<LoanPurposeModel>>(
      `${this.endpoint}`
    );
  }
}
