import { Injectable } from '@angular/core';
import { attachAction } from '@ngxs-labs/attach-action';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { Auth } from './auth.actions';
import { signup } from './auth.commands';
import Signup = Auth.Signup;
import LoginSuccess = Auth.LoginSuccess;
import LoginWithEmailAndPassword = Auth.LoginWithEmailAndPassword;
import Logout = Auth.Logout;

export class AuthStateModel {
  loggedInUser: CurrentUserInterface;
  userName: string;
  // newUser: SignupRequestInterface
  // role: Role;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser: undefined,
    userName: 'No',
    // role: undefined,
  },
})

@Injectable()
export class AuthState {

  constructor( private authService: AuthService ) {
    // attachAction(AuthState, Auth.Signup, signup(authService));
  }

  @Action(Signup)
  signup(
    { getState, setState }: StateContext<AuthStateModel>,
    action: Signup ) {

    const state = getState();
    return this.authService.signup(action.newUser)
      .pipe(
        tap(( result ) => {
          console.log(`Ngxs signup ${ result }`);
          setState({
            ...state,
            loggedInUser: result,
            userName: 'Usuario prueba',
          });
        }),
      );
  }

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(
    ctx: StateContext<AuthStateModel>,
    action: LoginWithEmailAndPassword ) {

    return this.authService
      .login(action.authUser).pipe(
        tap(( result ) => {
          ctx.dispatch(new LoginSuccess(result));
        }),
      );
  }

  @Action(Logout)
  logout( { getState, setState }: StateContext<AuthStateModel> ) {
    return this.authService.logout()
      .pipe(
        tap(( result ) => {
          console.log(result);
          const state = getState();
          setState({
            ...state,
            loggedInUser: undefined,
            userName: undefined,
          });
          // dispatch(new Navigate([ routingConstants.welcome ]));
        }),
      );
  }

  EVENTS

  @Action(LoginSuccess)
  onLoginSuccess( ctx: StateContext<AuthStateModel>, event: LoginSuccess ) {
    const state = ctx.getState;

    ctx.setState({
      ...state,
      loggedInUser: event.user,
      userName: 'Usuario prueba',
    });

    // this.router.navigateByUrl('/forms-creator');
  }


  // @Action(GetRole)
  // getRole( ctx: StateContext<AuthStateModel>, action: GetRole ) {
  //   const state = ctx.getState();
  //   return this.authService
  //     .getRole(action.id).pipe(
  //       tap(( roleFound ) => {
  //         ctx.setState({
  //           ...state,
  //           role: roleFound,
  //         });
  //       }),
  //     );
  // }
}
