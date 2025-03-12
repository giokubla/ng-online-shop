import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/types/product.types';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  public product!: Product;
  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.getProductId()
  }
  getProductId() {
    this.route.params.subscribe((data: Params) => {
      this.getProductById(data['id'])
    }) 
  }
  getProductById(id: string) {
    this.service.productById(id).subscribe(el => this.product = el)
  }
}
