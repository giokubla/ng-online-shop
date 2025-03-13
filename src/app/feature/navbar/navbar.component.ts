import { Component, input, output } from '@angular/core';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { UserDto } from '../../core/types/user.types';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    NzFlexDirective,
    NzIconDirective,
    NzButtonComponent,
    NzAvatarComponent,
    UpperCasePipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  signIn = output<void>();
  signOut = output<void>();
  isAuthenticated = input<boolean>();
  userData = input<UserDto | null>(null);
}
