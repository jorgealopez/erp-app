import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthProcessorFacade } from '../../core/auth/services/auth-processor.facade';
import {
  EmitEvent,
  EventBusService,
  Events,
} from '../../core/services/event-bus.service';
import { CurrentUserInterface } from '../../core/types/currentUser.interface';
import { SidenavFacadeService } from '../sidenav/sidenav.facade.service';
import { Auth } from './auth.actions';
import Login = Auth.Login;
import LoginSuccess = Auth.LoginSuccess;
import Logout = Auth.Logout;
import Signup = Auth.Signup;

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
    private authProcessorFacade: AuthProcessorFacade,
    private sidenavFacade: SidenavFacadeService,
    private router: Router,
    private eventBusService: EventBusService ) {
    // attachAction(AuthState, Auth.Signup, signup(authService));
  }

  @Action(Signup)
  signup(
    { getState, setState }: StateContext<AuthStateModel>,
    action: Signup ) {

    const state = getState();
    return this.authProcessorFacade.signup(action.newUser)
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

  @Action(Login)
  login( ctx: StateContext<AuthStateModel>, action: Login ) {
    return this.authProcessorFacade
      .login(action.authUser, action.authName).pipe(
        tap(( result ) => {
          ctx.dispatch(new LoginSuccess(result));
          this.eventBusService.emit(
            new EmitEvent(Events.Login, 'LoginSuccess'));
        }),
      );
  }

  @Action(Logout)
  logout( { getState, setState }: StateContext<AuthStateModel> ) {
    return this.authProcessorFacade.logout()
      .pipe(
        tap(( result ) => {
          console.log(result);
          const state = getState();
          setState({
            ...state,
            loggedInUser: undefined,
            userName: undefined,
          });
          this.router.navigate([ '/home' ]);
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
