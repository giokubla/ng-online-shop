import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public http: HttpClient) {}
  productById(productId: string) {
    return this.http.get<Product>(
      `https://api.everrest.educata.dev/shop/products/id/${productId}`,
    );
  }
  productsByCategory(categoryId: string) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/category/${categoryId}?page_index=1&page_size=5`)
  }
}
