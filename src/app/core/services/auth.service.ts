import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SignInDto, SignUpDto, UserToken } from '../types/auth.types';
import { UserDto } from '../types/user.types';
import { switchMap, tap } from 'rxjs';
import { UsersService } from './users.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userService = inject(UsersService);
  cookieService = inject(CookieService);
  token = signal<string>('');
  userAuthenticated = computed(() => !!this.token());
  constructor(private http: HttpClient) {}
  signIn(data: SignInDto) {
    return this.http
      .post<UserToken>('https://api.everrest.educata.dev/auth/sign_in', data)
      .pipe(
        tap(({ access_token }) => {
          this.token.set(access_token);
          this.cookieService.set('access_token', access_token);
        }),
        switchMap(() => this.userService.getUser()),
      );
  }
  signUp(data: SignUpDto) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_up',
      data,
    );
  }
}
