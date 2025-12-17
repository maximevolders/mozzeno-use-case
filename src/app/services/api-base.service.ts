import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiBaseService {
  protected readonly baseUrl = `${environment.apiBaseUrl}/api`;

  constructor(protected httpClient: HttpClient) {}
}
