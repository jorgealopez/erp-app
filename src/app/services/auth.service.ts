import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequestInterface } from '../auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../auth/types/signupRequest.interface';
import {
  AuthName,
  AuthProcessorInterface,
  AuthProcessorToken,
} from '../processors/auth/auth-processor.interface';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';

@Injectable()
export class AuthService {

  constructor(
    @Inject(AuthProcessorToken)
    private auth: AuthProcessorInterface[] ) {}

  signupProcessor(
    authData: SignupRequestInterface,
    authName: AuthName ): Observable<CurrentUserInterface> {
    const auth = this.auth.find(x => x.name === authName);
    return auth.signup(authData);
  }

  loginProcessor(
    authData: LoginRequestInterface,
    authName: AuthName ): Observable<CurrentUserInterface> {
    const auth = this.auth.find(x => x.name === authName);
    return auth.login(authData);
  }

  logoutProcessor( authName: AuthName ): Observable<void> {
    const auth = this.auth.find(x => x.name === authName);
    return auth.logout();
  }

  // getUser( response: AuthResponseInterface ): CurrentUserInterface {
  //   console.log(response.user);
  //   const userResponse: CurrentUserInterface = {
  //     email: response.user.email,
  //     uid: response.user.uid,
  //     displayName: response.user.displayName,
  //   };
  //   return userResponse;
  // }

  // signup( authData: SignupRequestInterface ):
  // Observable<CurrentUserInterface> { return from(
  // this.afAuth.createUserWithEmailAndPassword( authData.user.email,
  // authData.user.password, ), ).pipe(map(this.getUser), tap(a =>
  // this.router.navigate([ '/home' ])), ); }

  // login( authData: LoginRequestInterface ): Observable<CurrentUserInterface>
  // { console.log(authData.user.email); return from(
  // this.afAuth.signInWithEmailAndPassword( authData.user.email,
  // authData.user.password, ), ).pipe(map(this.getUser), shareReplay(1) ); }

  // logout(): Observable<void> {
  //   this.router.navigate([ '/home' ]).then(
  //     a => alert('Logout'),
  //   );
  //   return from(this.afAuth.signOut());
  // }
}
