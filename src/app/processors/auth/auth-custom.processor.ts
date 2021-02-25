import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthResponseInterface } from '../../auth/types/authResponse.interface';
import { LoginRequestInterface } from '../../auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../../auth/types/signupRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthName, AuthProcessorInterface } from './auth-processor.interface';

@Injectable()
export class AuthCustomProcessor implements AuthProcessorInterface {
  name: AuthName = 'custom';

  constructor( private firebaseAuth: AngularFireAuth ) {}

  login( authData: LoginRequestInterface ): Observable<CurrentUserInterface> {
    return from(this.firebaseAuth.signInWithEmailAndPassword(
      authData.user.email,
      authData.user.password,
      ),
    ).pipe(map(this.getUser),
      tap(a => console.log(a)));
  }

  getUser( response: AuthResponseInterface ): CurrentUserInterface {
    console.log(response.user);
    return {
      email: response.user.email,
      uid: response.user.uid,
      displayName: response.user.displayName,
    };
  }

  logout(): Observable<void> {
    return from(this.firebaseAuth.signOut());
  }

  signup( authData: SignupRequestInterface ): Observable<CurrentUserInterface> {
    return undefined;
  }
}
