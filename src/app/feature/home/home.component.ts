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
  public choosenCategory = signal<string>('');
  public choosenBrand = signal<string>('');
  public whichFunctionIsUsed = signal<string>('all');
  constructor(public service: ProductsService) {
    this.getProductBrands();
    this.getProducts();
    this.getProductCategories();
  }
  getProducts() {
    this.service
      .products(this.pageIndex(), this.productsLengthOnPage())
      .subscribe((el) => {
        this.products.set(el.products);
        this.totalProducts.set(el.total);
      });
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
    if (this.whichFunctionIsUsed() === 'all') {
      this.pageIndex.set(index);
      this.getProducts();
    } else if (this.whichFunctionIsUsed() === 'categorySearch') {
      this.pageIndex.set(index);
      this.service
        .productsByCategory(
          this.choosenCategory(),
          this.pageIndex(),
          this.productsLengthOnPage(),
        )
        .subscribe((el) => {
          this.products.set(el.products);
          this.totalProducts.set(el.total);
        });
    } else if (this.whichFunctionIsUsed() === 'brandSearch') {
      this.pageIndex.set(index);
      this.service
        .productsByBrand(
          this.choosenBrand(),
          this.pageIndex(),
          this.productsLengthOnPage(),
        )
        .subscribe((el) => {
          this.products.set(el.products);
          this.totalProducts.set(el.total);
        });
    }
  }
  getProductsByCategory(categoryId: string) {
    this.service
      .productsByCategory(
        categoryId,
        this.pageIndex(),
        this.productsLengthOnPage(),
      )
      .subscribe((el) => {
        this.products.set(el.products);
        this.totalProducts.set(el.total);
        if (categoryId === '1') {
          this.choosenCategory.set('1');
        } else {
          this.choosenCategory.set('2');
        }
      });
    this.whichFunctionIsUsed.set('categorySearch');
  }
  getProductsByBrand(brandName: string) {
    this.service
      .productsByBrand(brandName, this.pageIndex(), this.productsLengthOnPage())
      .subscribe((el) => {
        this.products.set(el.products);
        this.totalProducts.set(el.total);
        this.choosenBrand.set(brandName);
      });
    this.whichFunctionIsUsed.set('brandSearch');
  }
}
