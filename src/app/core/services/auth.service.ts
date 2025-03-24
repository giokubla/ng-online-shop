import { HttpClient, httpResource } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserDto } from '../types/user.types';
import { Router } from '@angular/router';
import { SignInDto, SignUpDto, UserToken } from '../types/auth.types';
import { catchError, tap, throwError } from 'rxjs';
import { TOKEN_KEY } from '../types/token-key';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieService = inject(CookieService);
  private token = signal<string | null>(null);
  private apiUrl = 'https://api.everrest.educata.dev/auth';
  private readonly userResource = httpResource<UserDto>(() => {
    const token = this.token() || this.getToken();
    if (!token) {
      return undefined;
    }
    return this.apiUrl;
  });
  readonly isAuthenticated = computed(() => !!this.user() || !!this.token());
  readonly user = computed(() => this.userResource.value());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    effect(() => {
      console.log(this.isAuthenticated());
    });
  }

  login(data: SignInDto) {
    return this.http.post<UserToken>(`${this.apiUrl}/sign_in`, data).pipe(
      tap(({ access_token, refresh_token }) => {
        this.setToken(access_token);
        this.router.navigate(['/']);
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => 'Login failed');
      }),
    );
  }
  signUp(data: SignUpDto) {
    return this.http.post<UserToken>(`${this.apiUrl}/sign_up`, data).pipe();
  }
  logout(): void {
    this.removeToken();
    this.token.set(null);
    this.userResource.reload();
  }
  setToken(token: string): void {
    this.token.set(token);
    const expirationDays = 1;
    this.cookieService.set(
      TOKEN_KEY,
      token,
      expirationDays,
      '/',
      undefined,
      false,
      'Strict',
    );
  }

  getToken(): string {
    return this.cookieService.get(TOKEN_KEY);
  }

  removeToken(): void {
    this.cookieService.delete(TOKEN_KEY);
  }
}
