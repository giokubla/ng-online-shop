import { computed, inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { tap } from 'rxjs';
import { AddProductToCartDto, ProductIdDto, ResCart } from '../types/cart.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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
      .pipe(tap(() => this.cartResource.reload()));
  }
  patchCard(data: AddProductToCartDto) {
    return this.http
      .patch('https://api.everrest.educata.dev/shop/cart/product', data)
      .pipe(tap(() => this.cartResource.reload()));
  }
  delete(data: ProductIdDto) {
    return this.http
      .delete('https://api.everrest.educata.dev/shop/cart/product', {
        body: data,
      })
      .pipe(tap(() => this.cartResource.reload()));
  }
}
