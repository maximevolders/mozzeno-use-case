import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '@models/product.model';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { ApiBaseService } from './api-base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiBaseService {

  private readonly endpoint = `${this.baseUrl}/products`;
  
  /**
   * Returns all products (for all Risk Classes) linked to a specific LoanPurpose
   * @param {string} purposeId: ID of the loan purpose
   * @param {number} amount: amount of money to be borrowed
   * @returns Array of all Products, for all Risk Classes
   */
  getProducts(purposeId: string, amount: number): Observable<Array<ProductModel>> {
    const riskClasses = ['A', 'B', 'C', 'D'];
    const allProducts: Array<Observable<Array<ProductModel>>> = [];
    riskClasses.forEach(riskClass => {
      const params = new HttpParams()
        .set('purposeid', purposeId)
        .set('amount', amount.toString())
        .set('currency', 'EUR')
        .set('simulation', 'true')
        .set('riskclass', riskClass)
        .set('branchId', '71c328ab-0e52-47dc-a50e-011469aebe87');
      let products = this.httpClient.get<Array<ProductModel>>(
        `${this.endpoint}/`,
        { params: params }
      ).pipe(
        catchError(err => {
        return of([]);
      }));
      allProducts.push(products);
    });

    return forkJoin(allProducts).pipe(
      map(results => results.flat())
    );
  }
}