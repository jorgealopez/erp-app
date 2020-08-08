import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import {
  signupAction,
  signupSuccessAction,
  signupFailureAction,
  logoutAction,
} from '../actions/signup.actions';

import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class SignupEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupAction),
      switchMap(({ request }) => {
        console.log(`switch ${request.user.username}`);
        return this.authService.signup(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            tap((a) => console.log(a));
            // console.log(`currentUser ${currentUser}`);
            // this.persistanceService.set('accessToken', currentUser.token);
            return signupSuccessAction({ currentUser });
          }),
          catchError((error) => {
            console.log(error);
            return of(signupFailureAction(error));
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupSuccessAction),
        tap(() => {
          console.log('redirect');
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  // logActions$ = createEffect(
  //   () => this.actions$.pipe(tap((action) => console.log(action))),
  //   { dispatch: false }
  // );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          console.log('logout');
          return this.authService.logout();
        })
      ),
    { dispatch: false }
  );
}
