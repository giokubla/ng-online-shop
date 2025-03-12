import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductCategories, TotalProducts } from '../types/product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public http: HttpClient) {}
  products(pageInd: number, pageSize: number) {
    return this.http.get<TotalProducts>(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${pageInd}&page_size=${pageSize}`,
    );
  }
  productsBrands() {
    return this.http.get<string[]>(
      'https://api.everrest.educata.dev/shop/products/brands',
    );
  }
  productById(productId: string) {
    return this.http.get<Product>(`https://api.everrest.educata.dev/shop/products/id/${productId}`)
  }
  productCategories() {
    return this.http.get<ProductCategories[]>('https://api.everrest.educata.dev/shop/products/categories')
  }
}
