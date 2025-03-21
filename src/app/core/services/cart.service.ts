import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = signal<any>(null);
  public cartInfo = computed(() => this.cart());
  constructor(private http: HttpClient) {}
  getCart() {
    return this.http
      .get('https://api.everrest.educata.dev/shop/cart')
      .pipe(tap((cart) => this.cart.set(cart)));
  }
  postCard(data: any) {
    return this.http
      .post('https://api.everrest.educata.dev/shop/cart/product', data)
      .pipe(switchMap(() => this.getCart()));
  }
  patchCard(data: any) {
    return this.http
      .patch('https://api.everrest.educata.dev/shop/cart/product', data)
      .pipe(switchMap(() => this.getCart()));
  }
}
