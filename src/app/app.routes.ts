import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { ProductDetailsComponent } from './feature/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
];
