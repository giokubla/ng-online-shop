import { Component, computed, effect, inject, signal } from '@angular/core';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { AuthComponent } from './feature/auth/auth.component';
import { AuthService } from './core/services/auth.service';
import { SignInDto, SignUpDto } from './core/types/auth.types';
import { RouterModule } from '@angular/router';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, AuthComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-online-shop';
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  protected readonly userData = computed(() => this.authService.user());
  readonly quantity = computed(
    () => this.cartService.cartInfo()?.total.quantity,
  );
  isAuthenticated = computed(() => this.authService.isAuthenticated());
  loginVisible = signal(false);
  constructor() {
    effect(() => {
      if (this.isAuthenticated()) {
        this.cartService.getCart().subscribe();
      }
    });
  }
  onSignIn() {
    this.loginVisible.set(true);
  }
  onClose() {
    this.loginVisible.set(false);
  }
  onSubmitLogIn(userInfo: SignInDto) {
    this.authService
      .login(userInfo)
      .subscribe(() => this.loginVisible.set(false));
  }
  onSubmitSignUp(userInfo: SignUpDto) {
    this.authService
      .signUp(userInfo)
      .subscribe(() => this.loginVisible.set(false));
  }

  onSignOut() {
    this.authService.logout();
  }
}
