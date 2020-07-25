import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  switchMap,
  tap,
  mergeMap,
  flatMap,
} from 'rxjs/operators';

import {
  signupAction,
  signupSuccessAction,
  signupFailureAction,
} from '../actions/signup.actions';

import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { of, from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class SignupEffect {
  public user: firebase.User;
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
}
