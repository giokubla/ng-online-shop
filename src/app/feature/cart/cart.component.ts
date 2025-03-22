import { Component, output } from '@angular/core';
import {
  NzDrawerComponent,
  NzDrawerContentDirective,
} from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { CartService } from '../../core/services/cart.service';
import { ResCart } from '../../core/types/cart.type';

@Component({
  selector: 'app-cart',
  imports: [
    NzDrawerComponent,
    NzDrawerContentDirective,
    NzIconModule,
    NzListModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  public cartInfo!: ResCart;
  close = output();
  constructor(public cartService: CartService) {
    this.cart()
  }
  cart() {
    this.cartService.getCart().subscribe((el: any) => {this.cartInfo = el, console.log(this.cartInfo)})
  }
}
