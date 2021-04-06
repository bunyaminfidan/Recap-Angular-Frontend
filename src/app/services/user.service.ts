import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44320/api/users/';

  constructor(private httpClient: HttpClient) {}

  getUserByEmail(email: string): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(
      this.apiUrl + 'getbyemail?email=' + email
    );
  }
  // getUserClaimByEmail(email:string){
  //   return this.httpClient.get<SingleResponseModel<>>

  // }
}
