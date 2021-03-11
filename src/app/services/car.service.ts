import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponseModule } from '../models/carResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44320/api/cars/getalldetail';
  
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<CarResponseModule> {
    return this.httpClient.get<CarResponseModule>(this.apiUrl);
  }
}
