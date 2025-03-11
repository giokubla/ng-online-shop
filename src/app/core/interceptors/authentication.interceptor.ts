import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(CookieService).get('access_token');
  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
