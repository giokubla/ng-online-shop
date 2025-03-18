import { Component } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/types/product.types';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-product-details',
  imports: [
    NzCarouselModule,
    NzBadgeModule,
    NzDescriptionsModule,
    NzFlexModule,
    NzListModule,
    NzTypographyModule,
    NzButtonModule,
    RouterModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  public product!: Product;
  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
  ) {
    this.getProductId();
  }
  getProductId() {
    this.route.params.subscribe((data: Params) => {
      this.getProductById(data['id']);
    });
  }
  getProductById(id: string) {
    this.service.productById(id).subscribe((el: Product) => {
      (this.product = el), console.log(this.product);
    });
  }
}
