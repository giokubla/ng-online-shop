import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { AuthComponent } from './feature/auth/auth.component';
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import { AuthService } from './core/services/auth.service';
import { SignInDto } from './core/types/auth.types';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzLayoutComponent,
    AuthComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  usersService = inject(UsersService);
  authorizationVisible = signal<boolean>(false);
  title = 'ng-online-shop';
  constructor(public service: AuthService) {
    this.usersService.getUser().subscribe();
  }
  onSignIn() {
    this.authorizationVisible.set(true);
  }
  onClose() {
    this.authorizationVisible.set(false);
  }
  onSubmit(userInfo: SignInDto) {
    this.service.signIn(userInfo).subscribe((el) => console.log(el));
  }
}
