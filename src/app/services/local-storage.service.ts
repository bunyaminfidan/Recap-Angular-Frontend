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

  removeToken(key: string) {
    localStorage.removeItem('token');
  }

  saveEmail(value: string) {
    localStorage.removeItem('email');
    localStorage.setItem('email', value);
  }
  getEmail() {
    return localStorage.getItem('email');
  }

  removeEmail(key: string) {
    localStorage.removeItem('email');
  }

  saveUserId(value: string) {
    localStorage.removeItem('userId');
    localStorage.setItem('userId', value);
  }
  getUserId() {
    return localStorage.getItem('userId');
  }

  removeUserId(key: string) {
    localStorage.removeItem('userId');
  }
}
