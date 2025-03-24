import { Component, computed, effect, inject } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import {
  NzFormControlComponent,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { httpResource } from '@angular/common/http';
import { BaseSearchDto, Category } from '../../core/types/product.types';
import { buildParamsFromQuery } from '../../core/utils/query-params';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

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
    NzEmptyComponent,
    FormsModule,
    NzIconDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzDividerComponent,
    NzRateComponent,
    NzFormItemComponent,
    NzFormControlComponent,
    NzColDirective,
    NzRowDirective,
    NzInputNumberModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);
  private routeQueryParams = toSignal(this.route.queryParams);
  public isAuthenticated = computed(() => this.authService.isAuthenticated());
  private userInfo = computed(() => this.authService.user());
  queryParams = computed(() => {
    return {
      page_size: +this.routeQueryParams()?.['page_size'] || 10,
      page_index: +this.routeQueryParams()?.['page_index'] || 1,
      rating: +this.routeQueryParams()?.['rating'] || 0,
      brand: this.routeQueryParams()?.['brand'],
      price_min: +this.routeQueryParams()?.['price_min'],
      price_max: +this.routeQueryParams()?.['price_max'],
      keywords: this.routeQueryParams()?.['keywords'],
      category_id: this.routeQueryParams()?.['category_id'],
    };
  });
  pageSize = computed(() => this.queryParams().page_size);
  pageIndex = computed(() => this.queryParams().page_index);
  category = computed(() =>
    this.categories
      .value()
      ?.find((c) => c.id === this.queryParams().category_id),
  );
  totalProducts = httpResource<BaseSearchDto>(() => ({
    url: 'https://api.everrest.educata.dev/shop/products/search',
    params: buildParamsFromQuery(this.queryParams()),
  }));
  totalProductsComputed = computed(() => ({
    ...this.totalProducts.value(),
    products: this.totalProducts.value()?.products.map((product) => ({
      ...product,
      quantity: 1,
    })),
  }));
  brands = httpResource<string[]>(
    () => 'https://api.everrest.educata.dev/shop/products/brands',
  );
  categories = httpResource<Category[]>(
    () => 'https://api.everrest.educata.dev/shop/products/categories',
  );
  filterForm = this.fb.group({
    keywords: this.fb.control(''),
    price_min: this.fb.control<number>(0),
    price_max: this.fb.control<number>(0),
    rating: this.fb.control<number>(0),
  });
  constructor(private cartService: CartService) {
    effect(() => {
      const params = this.queryParams();
      this.filterForm.patchValue(params);
    });
  }

  onPageSizeChange(page_size: number) {
    this.router.navigate([], {
      queryParams: { page_size },
      queryParamsHandling: 'merge',
    });
  }

  onPageIndexChange(page_index: number) {
    this.router.navigate([], {
      queryParams: { page_index },
      queryParamsHandling: 'merge',
    });
  }

  onFormFilter() {
    this.router.navigate([], {
      queryParams: this.filterForm.getRawValue(),
      queryParamsHandling: 'merge',
    });
  }
  addToCart(id: string, quantity: number) {
    const data = {
      id,
      quantity,
    };
    console.log('card', !Boolean(this.userInfo()?.cartID));
    if (!Boolean(this.userInfo()?.cartID)) {
      this.cartService.postCard(data).subscribe();
    } else {
      this.cartService.patchCard(data).subscribe();
    }
  }
  detailPage(productId: string) {
    this.router.navigate(['product-details', productId]);
  }
}
