import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequestInterface } from '../../auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../../auth/types/signupRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor( private authService: AuthService) { }

  signup(user: SignupRequestInterface): Observable<CurrentUserInterface> {
    return this.authService.signupProcessor(user, 'firebase');
  }

  login(user: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.authService.loginProcessor(user, 'firebase');
  }

  logout(): Observable<void> {
    return this.authService.logoutProcessor('firebase');
}

}
