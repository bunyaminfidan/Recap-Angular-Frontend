import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RegisteredCreditCard } from '../models/registeredCreditCard';

@Injectable({
  providedIn: 'root',
})
export class RegisteredCreditCardService {
  apiUrl = 'https://localhost:44320/api/registeredcreditcards/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<RegisteredCreditCard>> {
    let netPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<RegisteredCreditCard>>(
      netPath
    );
  }

  getByUserId(
    userId: number
  ): Observable<ListResponseModel<RegisteredCreditCard>> {
    let netPath = this.apiUrl + 'getbyuserid?userId=' + userId;
    return this.httpClient.get<ListResponseModel<RegisteredCreditCard>>(
      netPath
    );
  }
}
