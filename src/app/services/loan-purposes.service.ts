import { Injectable, signal } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { Observable } from 'rxjs';
import { LoanPurposeModel } from '@models/loan-purpose.model';

@Injectable({
  providedIn: 'root',
})
export class LoanPurposesService extends ApiBaseService {

  private readonly endpoint = `${this.baseUrl}/loan-purposes`;

  loading = signal(false);
  
  getLoanPurposes(): Observable<Array<LoanPurposeModel>> {
    return this.httpClient.get<Array<LoanPurposeModel>>(
      `${this.endpoint}`
    );
  }
}
