import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoginRequestInterface } from '../../auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../../auth/types/signupRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { Auth } from './auth.actions';
import { AuthSelectors } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {

  @Select(AuthSelectors.loggedInUser)
  isLoggedIn$: Observable<CurrentUserInterface>;

  constructor() { }

  @Dispatch()
  public logInWithEmailAndPassword( authData: LoginRequestInterface ) {
    return new Auth.LoginWithEmailAndPassword(authData);
  }

  @Dispatch()
  public logout() {
    return new Auth.Logout();
  }

  @Dispatch()
  public signup(authData: SignupRequestInterface) {
    return new Auth.Signup(authData);
  }

}

