import { Component, input, output } from '@angular/core';
import {
  NzDrawerComponent,
  NzDrawerContentDirective,
} from 'ng-zorro-antd/drawer';
import {
  NzDescriptionsComponent,
  NzDescriptionsItemComponent,
} from 'ng-zorro-antd/descriptions';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { UserDto } from '../../core/types/user.types';
import { UpperCasePipe } from '@angular/common';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-profile',
  imports: [
    NzDrawerComponent,
    NzDrawerContentDirective,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzDividerComponent,
    UpperCasePipe,
    NzAvatarComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user = input<UserDto>();
  close = output();
}
