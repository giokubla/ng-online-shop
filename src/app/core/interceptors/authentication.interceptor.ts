import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TOKEN_KEY } from '../types/token-key';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(CookieService).get(TOKEN_KEY);
  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
