import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveToken(value: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', value);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  // saveEmail(value: string) {
  //   localStorage.removeItem('email');
  //   localStorage.setItem('email', value);
  // }
  // getEmail() {
  //   return localStorage.getItem('email');
  // }

  // removeEmail() {
  //   localStorage.removeItem('email');
  // }

  clean() {
    localStorage.clear();
  }
}
