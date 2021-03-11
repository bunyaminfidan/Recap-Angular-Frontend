import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModule } from '../models/rentalResponseModule';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44320/api/rentals/getalldetail';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<RentalResponseModule> {
    return this.httpClient.get<RentalResponseModule>(this.apiUrl);
  }
}
