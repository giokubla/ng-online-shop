import { Component, input, output, signal } from '@angular/core';
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
import { ProfileComponent } from '../profile/profile.component';

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
    ProfileComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  quantity = input<number>();
  isAuthenticated = input<boolean>();
  userData = input<UserDto>();
  signIn = output<void>();
  signOut = output<void>();
  drawerCartShow = signal(false);
  drawerProfileShow = signal(false);
}
