import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { attachAction } from '@ngxs-labs/attach-action';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthFacadeService } from '../../services/auth/auth-facade.service';
import {
  EmitEvent,
  EventBusService,
  Events,
} from '../../services/event-bus.service';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { Sidenav } from '../sidenav/sidenav.actions';
// import { Sidenav } from '../sidenav/sidenav.actions';
import { SidenavFacade } from '../sidenav/sidenav.facade';
import { Auth } from './auth.actions';
import LoginSuccess = Auth.LoginSuccess;
import LoginWithEmailAndPassword = Auth.LoginWithEmailAndPassword;
import Logout = Auth.Logout;
// import { signup } from './auth.commands';
import Signup = Auth.Signup;
import GetSidenavItems = Sidenav.GetSidenavItems;

// import GetSidenavItems = Sidenav.GetSidenavItems;

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

  constructor(
    private authFacadeService: AuthFacadeService,
    private sidenavFacade: SidenavFacade,
    private router: Router,
    private eventBusService: EventBusService) {
    // attachAction(AuthState, Auth.Signup, signup(authService));
  }

  @Action(Signup)
  signup(
    { getState, setState }: StateContext<AuthStateModel>,
    action: Signup ) {

    const state = getState();
    return this.authFacadeService.signup(action.newUser)
      .pipe(
        tap(result => {
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

    return this.authFacadeService
      .login(action.authUser).pipe(
        tap(( result ) => {
          ctx.dispatch(new LoginSuccess(result));
          // ctx.dispatch(
          //   new GetSidenavItems('UI-configuration/sidenav/menu-items'));
          this.eventBusService.emit(new EmitEvent(Events.Login, 'LoginSuccess'));
        }),
      );
  }

  @Action(Logout)
  logout( { getState, setState, dispatch }: StateContext<AuthStateModel> ) {
    return this.authFacadeService.logout()
      .pipe(
        tap(( result ) => {
          console.log(result);
          const state = getState();
          setState({
            ...state,
            loggedInUser: undefined,
            userName: undefined,
          });
          this.router.navigate(['/home']);
          // dispatch(new Navigate([ routingConstants.welcome ]));
        }),
      );
  }

  //EVENTS

  @Action(LoginSuccess)
  onLoginSuccess( ctx: StateContext<AuthStateModel>, event: LoginSuccess ) {
    const state = ctx.getState;

    ctx.setState({
      ...state,
      loggedInUser: event.user,
      userName: 'Usuario prueba',
    });
    // this.sidenavFacade.getSidenavItems('UI-configuration/sidenav/menu-items');
    this.router.navigateByUrl('/home');
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
