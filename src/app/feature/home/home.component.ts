import { Component } from '@angular/core';
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

@Component({
  selector: 'app-home',
  imports: [NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, NzButtonModule, NzFlexModule, NzCardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public products: Product[] = []
  public productBrands: string[] = []
  public productCategories: ProductCategories[] = []
  constructor(public service: ProductsService) {
    this.getProductBrands()
    this.getProducts()
    this.getProductCategories()
  }
  getProductBrands() {
    this.service.productsBrands().subscribe({
      next: (el) => {this.productBrands = el},
      error: (err) => {err}
    })
  }
  getProducts() {
    this.service.products(5, 3).subscribe(el => this.products = el.products)
  }
  getProductCategories() {
    this.service.productCategories().subscribe(el => this.productCategories = el)
  }
}
