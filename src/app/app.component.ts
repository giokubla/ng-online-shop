import { Component, signal } from '@angular/core';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { AuthComponent } from './feature/auth/auth.component';
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import { AuthService } from './core/services/auth.service';
import { SignInDto, SignUpDto } from './core/types/auth.types';

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
  authorizationVisible = signal<boolean>(false);
  title = 'ng-online-shop';
  constructor(public service: AuthService) {}
  onSignIn() {
    this.authorizationVisible.set(true);
  }
  onClose() {
    this.authorizationVisible.set(false);
  }
  onSubmitLogIn(userInfo: SignInDto) {
    this.service.signIn(userInfo).subscribe();
  }
  onSubmitSignUp(userInfo: SignUpDto) {
    this.service.signUp(userInfo).subscribe()
  }

}
