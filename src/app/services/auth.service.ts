import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Local } from 'protractor/built/driverProviders';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44320/api/auth/';
  userId: number;
  userName: string;
  roles: string[];

  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    // private jwtHelperService: JwtHelperService,
    private localStorageService: LocalStorageService
  ) {
    this.setUserId();
    this.setRoles();
  }

  loginModel(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'login',
      loginModel
    );
  }

  registerModel(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'register',
      registerModel
    );
  }

  setUserId() {
    if (this.localStorageService.getToken()) {
      var decoded = this.jwtHelperService.decodeToken(
        this.localStorageService.getToken()
      );
      var propUserId = Object.keys(decoded).filter((x) =>
        x.endsWith('/nameidentifier')
      )[0];
      this.userId = Number(decoded[propUserId]);
    }
  }

  setRoles() {
    if (this.localStorageService.getToken()) {
      var decoded = this.jwtHelperService.decodeToken(
        this.localStorageService.getToken()
      );
      var role = Object.keys(decoded).filter((x) => x.endsWith('/role'))[0];
      this.roles = decoded[role];
    }
  }

  getUserId() {
    return this.userId;
  }
  getRoles() {
    return this.roles;
  }

  isAuthenticated() {
    return this.localStorageService.getToken() ? true : false;
  }

  isAdmin() {
    return this.roles.includes('admin') ? true : false;
  }
}
