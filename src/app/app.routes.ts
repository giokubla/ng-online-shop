import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./feature/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./feature/error-page/error-page.component').then(
        (c) => c.ErrorPageComponent,
      ),
  },
];
