import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequestInterface } from '../../ui/auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../../ui/auth/types/signupRequest.interface';
import { CurrentUserInterface } from '../types/currentUser.interface';

export type AuthName = 'firebase' | 'custom';

export interface AuthProcessorInterface {
  name: AuthName;

  signup?( authData: SignupRequestInterface ): Observable<CurrentUserInterface>;

  login?( authData: LoginRequestInterface ): Observable<CurrentUserInterface>;

  logout(): Observable<void>;
}

export const AuthProcessorToken =
  new InjectionToken<AuthProcessorInterface>('AuthProcessorToken');
