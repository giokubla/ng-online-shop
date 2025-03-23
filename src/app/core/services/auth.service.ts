import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
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
  private apiUrl = 'https://api.everrest.educata.dev/auth';

  // Using signals instead of BehaviorSubjects
  private currentUserSignal = signal<UserDto | null>(null);
  private isAuthenticatedSignal = computed(() => this.currentUserSignal());

  // Expose readonly signals
  readonly user = computed(() => this.currentUserSignal());
  readonly isAuthenticated = computed(() => !!this.isAuthenticatedSignal());

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.initializeAuth();
  }

  initializeAuth(): void {
    const token = this.getToken();
    if (token) {
      // If token exists in cookie, set authenticated and fetch user
      this.fetchCurrentUser();
    }
  }

  login(data: SignInDto) {
    return this.http.post<UserToken>(`${this.apiUrl}/sign_in`, data).pipe(
      tap(({ access_token, refresh_token }) => {
        this.setToken(access_token);
        this.fetchCurrentUser();
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
    // Clear user data and token
    this.currentUserSignal.set(null);
    this.removeToken();
  }

  fetchCurrentUser(): void {
    this.http.get<UserDto>(`${this.apiUrl}`).subscribe({
      next: (user) => {
        this.currentUserSignal.set(user);
      },
      error: (error) => {
        console.error('Failed to fetch user', error);
        // If we can't fetch the user, the token might be invalid
        if (error.status === 401) {
          this.logout();
        }
      },
    });
  }

  // Token management with cookies
  setToken(token: string): void {
    // Set secure HttpOnly cookie with expiration (e.g., 1 day)
    // Use { secure: true, sameSite: 'strict' } in production
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
