import { Component, output } from '@angular/core';
import {
  NzDrawerComponent,
  NzDrawerContentDirective,
} from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-cart',
  imports: [NzDrawerComponent, NzDrawerContentDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  close = output();
}
