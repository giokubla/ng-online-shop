import { Component, signal } from '@angular/core';

import {NavbarComponent} from './feature/navbar/navbar.component';
import {LoginComponent} from './feature/login/login.component';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-root',
  imports: [ NavbarComponent, LoginComponent, NzHeaderComponent, NzContentComponent, NzLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authorizationVisible = signal<boolean>(false);
  title = 'ng-online-shop';

  onSignIn() {
    this.authorizationVisible.set(true)
  }
}
