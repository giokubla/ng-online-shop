import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { UserDto } from '../types/user.types';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  user = signal<UserDto>({});
  constructor() {}
  getUser() {
    return this.http.get('https://api.everrest.educata.dev/auth').pipe(
      tap((user) => {
        this.user.set(user);
      }),
    );
  }
}
