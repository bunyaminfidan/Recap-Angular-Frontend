import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44320/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getalldetail';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrands(id: number): Observable<ListResponseModel<Car>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getbybrandidcardetail?id=' + id;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColors(id: number): Observable<ListResponseModel<Car>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getbycoloridcardetail?id=' + id;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
