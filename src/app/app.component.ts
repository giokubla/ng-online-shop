import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { AuthComponent } from './feature/auth/auth.component';
import { AuthService } from './core/services/auth.service';
import { SignInDto, SignUpDto } from './core/types/auth.types';
import { RouterModule } from '@angular/router';
import { CartService } from './core/services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, AuthComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-online-shop';
  private destoryRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  protected readonly userData = computed(() => this.authService.user());
  readonly quantity = computed(
    () => this.cartService.cartResource.value()?.total.quantity,
  );
  isAuthenticated = computed(() => this.authService.isAuthenticated());
  loginVisible = signal(false);

  onSignIn() {
    this.loginVisible.set(true);
  }
  onClose() {
    this.loginVisible.set(false);
  }
  onSubmitLogIn(userInfo: SignInDto) {
    this.authService
      .login(userInfo)
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(() => this.loginVisible.set(false));
  }
  onSubmitSignUp(userInfo: SignUpDto) {
    this.authService
      .signUp(userInfo)
      .subscribe(() => this.loginVisible.set(false));
  }

  onSignOut() {
    alert('sign out');
    this.authService.logout();
  }
}
