import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequestInterface } from '../../auth/types/loginRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
