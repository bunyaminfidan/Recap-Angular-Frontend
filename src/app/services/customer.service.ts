import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44320/api/customers/';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + 'getalldetail';
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerById(
    customerId: number
  ): Observable<SingleResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + 'getbyidcustomerdetail?id=' + customerId;
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerByUserId(
    userId: number
  ): Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + 'getbyuserid?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

  update(customer: Customer): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, customer);
  }
}
