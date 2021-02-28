import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequestInterface } from '../../../ui/auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../../../ui/auth/types/signupRequest.interface';
import {
  AuthName,
  AuthProcessorInterface,
  AuthProcessorToken,
} from '../auth-processor.interface';
import { CurrentUserInterface } from '../../types/currentUser.interface';

@Injectable()
export class AuthProcessorService {

  constructor(
    @Inject(AuthProcessorToken)
    private auth: AuthProcessorInterface[] ) {}

  signupProcessor(
    authData: SignupRequestInterface,
    authName: AuthName ): Observable<CurrentUserInterface> {
    const auth = this.auth.find(x => x.name === authName);
    return auth.signup(authData);
  }

  loginProcessor(
    authData: LoginRequestInterface,
    authName: AuthName ): Observable<CurrentUserInterface> {
    const auth = this.auth.find(x => x.name === authName);
    return auth.login(authData);
  }

  logoutProcessor( authName: AuthName ): Observable<void> {
    const auth = this.auth.find(x => x.name === authName);
    return auth.logout();
  }

}
