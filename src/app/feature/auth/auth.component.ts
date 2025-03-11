import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SignInDto } from '../../core/types/auth.types';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzModalModule,
    NzSelectModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  @Input() public isVisible: boolean = false;
  @Output() public close = new EventEmitter<void>();
  @Output() public submitLogIn = new EventEmitter();
  @Output() public submitSignUp = new EventEmitter();
  public isLogInVisible = signal(true)
  public title = computed(() =>
    this.isLogInVisible() ? 'Enter your Email and Password' : 'Fill in all the fields'
  );
  
  public signInForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  public signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });
  handleCancel() {
    this.close.emit();
  }
  submitForm() {
    this.submitLogIn.emit(this.signInForm.value);
  }
  signUp() {
    this.submitSignUp.emit(this.signUpForm.value)
  }
  changeAuthMode() {
    this.isLogInVisible.update(visible => !visible)
  }
}
