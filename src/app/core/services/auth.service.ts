import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDto, SignUpDto, UserToken } from '../types/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  signIn(data: SignInDto) {
    return this.http.post<UserToken>('https://api.everrest.educata.dev/auth/sign_in', data)
  }
  signUp(data: SignUpDto) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_up', data)
  }
}
