import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userAuthenticated$ = signal<boolean>(false);
  token$ = signal<string>('');
  constructor() { }
}
