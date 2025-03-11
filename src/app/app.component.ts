import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { NavbarComponent } from './feature/navbar/navbar.component';
import { AuthComponent } from './feature/auth/auth.component';
import {
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import { AuthService } from './core/services/auth.service';
import { SignInDto } from './core/types/auth.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  service = inject(AuthService);
  destroyRef = inject(DestroyRef);
  authorizationVisible = signal<boolean>(false);
  title = 'ng-online-shop';
  isAuthenticated = signal<boolean>(false);
  constructor() {
    effect(() => {
      if (this.service.userAuthenticated()) {
        this.isAuthenticated.set(this.service.userAuthenticated());
        this.service
          .getUser()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }
    });
  }
  onSignIn() {
    this.authorizationVisible.set(true);
  }
  onClose() {
    this.authorizationVisible.set(false);
  }
  onSubmit(userInfo: SignInDto) {
    this.service
      .signIn(userInfo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
