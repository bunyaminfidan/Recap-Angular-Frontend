import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44320/api/';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + 'customers/getalldetail';
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerById(customerId: number): Observable<SingleResponseModel<CustomerDetail>> {
    let newPath =
      this.apiUrl + 'customers/getbyidcustomerdetail?id=' + customerId;
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(newPath);
  }
}
