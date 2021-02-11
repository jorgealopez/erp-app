import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { Auth } from './auth.actions';
import LoginWithEmailAndPassword = Auth.LoginWithEmailAndPassword;
import Logout = Auth.Logout;
import Signup = Auth.Signup;

export class AuthStateModel {
  loggedInUser: CurrentUserInterface;
  userName: string;
  // role: Role;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser: undefined,
    userName: undefined,
    // role: undefined,
  },
})

@Injectable()
export class AuthState {

  constructor( private authService: AuthService ) {}

  @Action(LoginWithEmailAndPassword)
  loginWithEmailAndPassword(
    ctx: StateContext<AuthStateModel>,
    action: LoginWithEmailAndPassword ) {

    const state = ctx.getState();

    return this.authService
      .login(action.authUser).pipe(
        tap(( result ) => {
          ctx.setState({
            ...state,
            loggedInUser: result,
            userName: 'Usuario prueba',
          });
          // ctx.dispatch(new GetRole(result.uid));
        }),
      );
  }

  @Action(Logout)
  logout( { getState, setState, dispatch }: StateContext<AuthStateModel> ) {
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

  @Action(Signup)
  signup({getState, setState}: StateContext<AuthStateModel>, action: Signup) {

    const state = getState();
    return this.authService.signup(action.newUser)
      .pipe(
      tap(( result ) => {
        console.log(`Ngxs signup ${result}`);
        setState({
          ...state,
          loggedInUser: result,
          userName: 'Usuario prueba',
        });
      }),
    );
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
