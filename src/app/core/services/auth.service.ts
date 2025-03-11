import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SignInDto, SignUpDto, UserToken } from '../types/auth.types';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserDto } from '../types/user.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cookieService = inject(CookieService);
  token = signal<string>('');
  user = signal<UserDto>({});
  userAuthenticated = computed(() => !!this.token());
  constructor(private http: HttpClient) {
    this.token.set(this.cookieService.get('access_token'));
  }
  getUser() {
    return this.http.get('https://api.everrest.educata.dev/auth').pipe(
      tap((user) => {
        this.user.set(user);
      }),
    );
  }
  signIn(data: SignInDto) {
    return this.http
      .post<UserToken>('https://api.everrest.educata.dev/auth/sign_in', data)
      .pipe(
        tap(({ access_token }) => {
          this.token.set(access_token);
          this.cookieService.set('access_token', access_token);
        }),
      );
  }
  signUp(data: SignUpDto) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_up',
      data,
    );
  }
}
