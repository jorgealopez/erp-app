import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SignupRequestInterface } from '../auth/types/signupRequest.interface';
import { LoginRequestInterface } from '../auth/types/loginRequest.interface';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { AuthResponseInterface } from '../auth/types/authResponse.interface';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    console.log(response.user);
    const userResponse: CurrentUserInterface = {
      email: response.user.email,
      uid: response.user.uid,
      displayName: response.user.displayName
    };
    return userResponse;
  }

  signup(authData: SignupRequestInterface): Observable<CurrentUserInterface> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(
        authData.user.email,
        authData.user.password
      )
    ).pipe(map(this.getUser));
  }

  login(authData: LoginRequestInterface): Observable<CurrentUserInterface> {
    return from(
      this.afAuth.signInWithEmailAndPassword(
        authData.user.email,
        authData.user.password
      )
    ).pipe(map(this.getUser));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
