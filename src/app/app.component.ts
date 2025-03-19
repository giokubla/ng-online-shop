import { Component, effect, inject, signal } from '@angular/core';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { AuthComponent } from './feature/auth/auth.component';
import { AuthService } from './core/services/auth.service';
import { SignInDto, SignUpDto } from './core/types/auth.types';
import { UserDto } from './core/types/user.types';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, AuthComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-online-shop';
  private authService = inject(AuthService);
  protected readonly userData = signal<UserDto | null>(null);
  authorizationVisible = signal<boolean>(false);
  isAuthenticated = signal<boolean>(false);
  constructor() {
    effect(() => {
      this.userData.set(this.authService.user());
      this.isAuthenticated.set(this.authService.isAuthenticated());
    });
  }
  onSignIn() {
    this.authorizationVisible.set(true);
  }
  onClose() {
    this.authorizationVisible.set(false);
  }
  onSubmitLogIn(userInfo: SignInDto) {
    this.authService
      .login(userInfo)
      .subscribe(() => this.authorizationVisible.set(false));
  }
  onSubmitSignUp(userInfo: SignUpDto) {
    this.authService
      .signUp(userInfo)
      .subscribe(() => this.authorizationVisible.set(false));
  }

  onSignOut() {
    this.authService.logout();
  }
}
