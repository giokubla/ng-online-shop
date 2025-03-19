import { Component, computed, inject, signal } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BaseSearchDto, Category } from '../../core/types/product.types';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { httpResource } from '@angular/common/http';
import { buildParamsFromQuery } from '../../core/utils/query-params';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { debounceTime } from 'rxjs';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzRateComponent } from 'ng-zorro-antd/rate';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private routeQueryParams = toSignal(this.route.queryParams);
  searchControl$ = new FormControl();
  constructor() {
    this.searchControl$.valueChanges
      .pipe(
        debounceTime(1000), // Wait 1 second after typing stops
      )
      .subscribe((value: string) => {
        this.router.navigate([], {
          queryParams: { keywords: value },
          queryParamsHandling: 'merge',
        });
      });
  }
  queryParams = computed(() => {
    const params = this.routeQueryParams() || {};
    return {
      page_size: Number(params['page_size']) || 10,
      page_index: Number(params['page_index']) || 1,
      brand: params['brand'],
      keywords: params['keywords'],
      category_id: params['category_id'],
    };
  });
  page_size = computed(() => this.queryParams().page_size);
  page_index = computed(() => this.queryParams().page_index);
  category = computed(() =>
    this.categories
      .value()
      ?.find((c) => c.id === this.queryParams().category_id),
  );
  totalProducts = httpResource<BaseSearchDto>(() => ({
    url: 'https://api.everrest.educata.dev/shop/products/search',
    params: buildParamsFromQuery(this.queryParams()),
  }));
  brands = httpResource<string[]>(
    () => 'https://api.everrest.educata.dev/shop/products/brands',
  );
  categories = httpResource<Category[]>(
    () => 'https://api.everrest.educata.dev/shop/products/categories',
  );

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

  onSearchInputChange($event: string) {
    console.log($event);
  }
}
