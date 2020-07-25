import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { SignupRequestInterface } from '../types/signupRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { of, from, Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    console.log(response.user);
    const a: CurrentUserInterface = {
      email: response.user.email,
      uid: response.user.uid,
    };
    // return response.user;
    return a;
  }

  signup(authData: SignupRequestInterface): Observable<CurrentUserInterface> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(
        authData.user.email,
        authData.user.password
      )
    ).pipe(map(this.getUser));
  }

  // .then((result) => {
  //   return from(
  //     (this.user = {
  //       uid: result.user.uid,
  //       email: result.user.email,
  //     })
  //   )
  //     .pipe(map((a) => this.getUser))
  //     .subscribe();
  // });

  // .then((result) => {
  //   console.log(result.user);
  // })
  // .catch((error) => {
  //   console.log(`error ${error}`);
  // });
  // registerWithEmail(
  //   authData: SignupRequestInterface
  // ): Promise<firebase.auth.UserCredential> {
  //   console.log('signup called');
  //   return this.afAuth
  //     .createUserWithEmailAndPassword(
  //       authData.user.email,
  //       authData.user.password
  //     )
  //     .then((result) => {});
  // }
}
