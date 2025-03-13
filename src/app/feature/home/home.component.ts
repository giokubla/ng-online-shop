import { Component, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Product, ProductCategories } from '../../core/types/product.types';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-home',
  imports: [
    NzMenuModule,
    NzLayoutModule,
    NzButtonModule,
    NzFlexModule,
    NzCardModule,
    RouterModule,
    NzPaginationModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public productsLengthOnPage = signal<number>(10);
  public pageIndex = signal<number>(1);
  public totalProducts = signal<number>(0);
  public products = signal<Product[]>([]);
  public productBrands = signal<string[]>([]);
  public productCategories = signal<ProductCategories[]>([]);
  constructor(public service: ProductsService) {
    this.getProductBrands();
    this.getProducts();
    this.getProductCategories();
  }
  getProductBrands() {
    this.service.productsBrands().subscribe({
      next: (el) => {
        this.productBrands.set(el);
      },
      error: (err) => {
        err;
      },
    });
  }
  getProducts() {
    this.service
      .products(this.pageIndex(), this.productsLengthOnPage())
      .subscribe((el) => {
        this.products.set(el.products);
        this.totalProducts.set(el.total);
      });
  }
  getProductCategories() {
    this.service
      .productCategories()
      .subscribe((el) => this.productCategories.set(el));
  }
  onPageSizeChange(size: number) {
    this.productsLengthOnPage.set(size);
    this.getProducts();
  }
  onPageIndexChange(index: number) {
    this.pageIndex.set(index);
    this.getProducts();
  }
}
