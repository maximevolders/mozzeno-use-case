import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiBaseService {

  private readonly endpoint = `${this.baseUrl}/products`;
  
  getProducts(purposeId: string, amount: number): Observable<Array<Object>> {
    const params = new HttpParams()
      .set('purposeid', purposeId)
      .set('amount', amount.toString())
      .set('currency', 'EUR')
      .set('simulation', 'true')
      .set('riskclass', 'A')
      .set('branchId', '71c328ab-0e52-47dc-a50e-011469aebe87');
    return this.httpClient.get<Array<Object>>(
      `${this.endpoint}`,
      {params: params}
    );
  }
}