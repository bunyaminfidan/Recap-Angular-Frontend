import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl = 'https://localhost:44320/api/';

  constructor(private httpClient: HttpClient) {}

  getByIdCarDetail(carId: number): Observable<ListResponseModel<CarDetail>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getbyiddetail?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
