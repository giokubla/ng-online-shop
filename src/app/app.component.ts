import { Component, signal } from '@angular/core';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { LoginComponent } from './feature/auth/auth.component';
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import { AuthService } from './core/services/auth.service';
import { SignInDto } from './core/types/auth.types';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    LoginComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzLayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authorizationVisible = signal<boolean>(false);
  title = 'ng-online-shop';
  constructor(public service: AuthService) {}
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
