import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthName } from '../../core/auth/auth-processor.interface';
import { LoginRequestInterface } from '../../ui/auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../../ui/auth/types/signupRequest.interface';
import { CurrentUserInterface } from '../../core/types/currentUser.interface';
import { Auth } from './auth.actions';
import { AuthSelectors } from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreFacade {

  @Select(AuthSelectors.loggedInUser)
  isLoggedIn$: Observable<CurrentUserInterface>;

  constructor() { }

  @Dispatch()
  public login( authData: LoginRequestInterface, authName: AuthName ) {
    return new Auth.Login(authData, authName);
  }

  @Dispatch()
  public logout() {
    return new Auth.Logout();
  }

  @Dispatch()
  public signup(authData: SignupRequestInterface) {
    return new Auth.Signup(authData);
  }
  //
  // login$ = this.eventBus.on(Events.Login,
  //   (a => {
  //       console.log(`evento ${JSON.stringify(a)  }`);
  //       this.login(a);
  //     })
  //     )


        // return this.login(a);

    // ;

}

