import { computed, inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  httpResource,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { AddProductToCartDto, ProductIdDto, ResCart } from '../types/cart.type';
import { AuthService } from './auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  nzNotification = inject(NzNotificationService);
  authService = inject(AuthService);
  cartResource = httpResource<ResCart | null>(() => {
    const user = this.authService.user();
    if (!user) {
      return undefined;
    }
    return 'https://api.everrest.educata.dev/shop/cart';
  });
  cartId = computed(() => this.authService.user()?.cartID);
  constructor(private http: HttpClient) {}
  postCard(data: AddProductToCartDto) {
    return this.http
      .post('https://api.everrest.educata.dev/shop/cart/product', data)
      .pipe(
        tap(() => {
          this.nzNotification.success('succesfully add cart', '');
          this.cartResource.reload();
        }),
        catchError((err: HttpErrorResponse) => {
          this.nzNotification.error(err.error.error, '', {
            nzPlacement: 'top',
          });
          throw err;
        }),
      );
  }
  patchCard(data: AddProductToCartDto) {
    return this.http
      .patch('https://api.everrest.educata.dev/shop/cart/product', data)
      .pipe(
        tap(() => {
          this.nzNotification.success('succesfully edit cart', '', {
            nzPlacement: 'top',
          });
          this.cartResource.reload();
        }),
        catchError((err: HttpErrorResponse) => {
          this.nzNotification.error(err.error.error, '', {
            nzPlacement: 'top',
          });
          throw err;
        }),
      );
  }
  cartCheckOut() {
    return this.http
      .post('https://api.everrest.educata.dev/shop/cart/checkout', {})
      .pipe(
        tap((el: any) => {
          this.nzNotification.success(el.message, '', {
            nzPlacement: 'top',
          });
          this.cartResource.reload();
        }),
      );
  }
  delete(data: ProductIdDto) {
    return this.http
      .delete('https://api.everrest.educata.dev/shop/cart/product', {
        body: data,
      })
      .pipe(
        tap(() => {
          this.nzNotification.success('succesfully deleted product', '', {
            nzPlacement: 'top',
          });
          this.cartResource.reload();
        }),
        catchError((err: HttpErrorResponse) => {
          this.nzNotification.error(err.error.error, '', {
            nzPlacement: 'top',
          });
          throw err;
        }),
      );
  }
}
