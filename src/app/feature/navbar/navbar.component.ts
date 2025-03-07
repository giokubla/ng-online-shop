import {Component, output} from '@angular/core';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-navbar',
  imports: [
    NzFlexDirective,
    NzIconDirective,
    NzButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  signIn = output<void>()
}
