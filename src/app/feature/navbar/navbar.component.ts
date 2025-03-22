import { Component, computed, input, output, signal } from '@angular/core';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { UserDto } from '../../core/types/user.types';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [
    NzFlexDirective,
    NzIconDirective,
    NzButtonComponent,
    NzAvatarComponent,
    NzBadgeComponent,
    NzDropdownMenuComponent,
    NzDropDownDirective,
    NzMenuItemComponent,
    NzMenuDirective,
    CartComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private cartService: CartService) {}
  quantity = input<number>();
  isAuthenticated = input<boolean>();
  userData = input<UserDto | null>(null);
  cartID = computed(() => this.userData()?.cartID);
  signIn = output<void>();
  signOut = output<void>();
  drawerShow = signal(false);
}
