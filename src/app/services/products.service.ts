import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '@models/product.model';
import { forkJoin, map, Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiBaseService {

  private readonly endpoint = `${this.baseUrl}/products`;
  
  getProducts(purposeId: string, amount: number): Observable<Array<ProductModel>> {
    const paramsA = new HttpParams()
      .set('purposeid', purposeId)
      .set('amount', amount.toString())
      .set('currency', 'EUR')
      .set('simulation', 'true')
      .set('riskclass', 'A')
      .set('branchId', '71c328ab-0e52-47dc-a50e-011469aebe87');
    const paramsD = paramsA.set('riskclass', 'D');
    let productsA$ = this.httpClient.get<Array<ProductModel>>(
      `${this.endpoint}/`,
      { params: paramsA }
    );
    let productsD$ = this.httpClient.get<Array<ProductModel>>(
      `${this.endpoint}/`,
      { params: paramsD }
    );

    return forkJoin([productsA$, productsD$]).pipe(
      map(([a, d]) => [...a, ...d])
    );
  }
}