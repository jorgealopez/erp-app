import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequestInterface } from '../../../ui/auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../../../ui/auth/types/signupRequest.interface';
import { CurrentUserInterface } from '../../types/currentUser.interface';
import { AuthName } from '../auth-processor.interface';
import { AuthProcessorService } from './auth-processor.service';

@Injectable({
  providedIn: 'root',
})
export class AuthProcessorFacade {

  constructor( private authService: AuthProcessorService ) { }

  signup( user: SignupRequestInterface ): Observable<CurrentUserInterface> {
    return this.authService.signupProcessor(user, 'firebase');
  }

  login(
    user: LoginRequestInterface,
    authName: AuthName ): Observable<CurrentUserInterface> {
    return this.authService.loginProcessor(user, authName);
  }

  logout(): Observable<void> {
    return this.authService.logoutProcessor('firebase');
  }

}
