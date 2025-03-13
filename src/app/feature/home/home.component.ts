import { Component, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Product, ProductCategories } from '../../core/types/product.types';
import { RouterModule } from '@angular/router';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-home',
  imports: [
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzButtonModule,
    NzFlexModule,
    NzCardModule,
    RouterModule,
    NzCascaderModule,
    NzDatePickerModule,
    NzGridModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public productsLengthOnPage = signal<number>(0);
  public totalProducts = signal<number>(0);
  public products = signal<Product[]>([]) ;
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
      .products(5, 3)
      .subscribe((el) => {
        this.products.set(el.products)
        this.totalProducts.set(el.total)
      });
  }
  getProductCategories() {
    this.service
      .productCategories()
      .subscribe((el) => (this.productCategories.set(el)));
  }
  log() {
    console.log(this.inp)
  }
  inp = ''
}
