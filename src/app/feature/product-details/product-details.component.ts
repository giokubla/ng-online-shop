import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { BaseSearchDto, Product } from '../../core/types/product.types';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';

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
    RouterModule,
    NzCardModule,
    NzInputNumberModule,
    FormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private authService = inject(AuthService);
  public isAuthenticated = computed(() => this.authService.isAuthenticated());
  private userInfo = computed(() => this.authService.user());
  public productQuantity = 1;
  public product!: Product;
  public sectorCards!: BaseSearchDto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
    private cartService: CartService,
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
      this.product = el;
      this.getProductsByCategory();
    });
  }
  getProductsByCategory() {
    this.service
      .productsByCategory(this.product.category.id)
      .subscribe((el: any) => {
        (this.sectorCards = el), console.log(this.sectorCards);
      });
  }
  navigate(id: string) {
    this.router
      .navigate(['../', id], {
        relativeTo: this.route,
      })
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
  addToCart(id: string) {
    let obj = {
      id,
      quantity: this.productQuantity
    }
    if (this.userInfo()?.cartID) {
      this.cartService.patchCard(obj).subscribe()
    } else {
      this.cartService.postCard(obj).subscribe()
    }
  }
}
