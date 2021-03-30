import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44320/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDetail>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getalldetail';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrands(brandId: number): Observable<ListResponseModel<CarDetail>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getbybrandidcardetail?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColors(colorId: number): Observable<ListResponseModel<CarDetail>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getbycoloridcardetail?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getByIdCarDetail(carId: number): Observable<ListResponseModel<CarDetail>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'cars/getbyiddetail?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getByIdCarImages(carId: number): Observable<ListResponseModel<CarImage>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath = this.apiUrl + 'carimages/getbycarid?carid=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  getByFilterCars(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    // return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
    let newPath =
      this.apiUrl +
      'cars/getbyfiltercar?brandid=' +
      brandId +
      '&colorid=' +
      colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car: CarDetail):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'cars/add', car);
  }
}
