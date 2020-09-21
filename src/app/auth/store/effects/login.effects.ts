import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {AuthService} from '../../../services/auth.service';

import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.actions';

@Injectable()
export class LoginEffect {
  login$ = createEffect(
    () => this.actions$.pipe(ofType(loginAction), switchMap(({request}) => {
      console.log('login switch');
      return this.authService.login(request)
        .pipe(map((currentUser: CurrentUserInterface) => {
          tap((a) => console.log(a));
          return loginSuccessAction({currentUser});
        }), catchError((error) => {
          console.log(error);
          return of(loginFailureAction(error));
        }));
    })));
  redirectAfterSubmit$ = createEffect(() => this.actions$
    .pipe(ofType(loginSuccessAction), tap(() => {
      console.log('redirect');
      this.router.navigateByUrl('/');
    })), {dispatch: false});

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router) {
  }
}
