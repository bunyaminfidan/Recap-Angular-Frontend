import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
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

  getCarsByBrands(brandId: number): Observable<ListResponseModel<Car>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getbybrandidcardetail?id=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColors(colorId: number): Observable<ListResponseModel<Car>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getbycoloridcardetail?id=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getByIdCarDetail(carId: number): Observable<ListResponseModel<Car>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getbyiddetail?id=' + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getByIdCarImages(carId: number): Observable<ListResponseModel<CarImage>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'carimages/getbycarid?carid=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  getByFilterCars(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<Car>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath =
      this.apiUrl +
      'cars/getbyfiltercar?brandid=' +
      brandId +
      '&colorid=' +
      colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
