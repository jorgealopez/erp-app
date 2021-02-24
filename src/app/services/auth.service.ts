import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AuthResponseInterface } from '../auth/types/authResponse.interface';
import { LoginRequestInterface } from '../auth/types/loginRequest.interface';

import { SignupRequestInterface } from '../auth/types/signupRequest.interface';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { SidenavService } from './sidenav.service';

@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: SidenavService ) {}

  getUser( response: AuthResponseInterface ): CurrentUserInterface {
    console.log(response.user);
    const userResponse: CurrentUserInterface = {
      email: response.user.email,
      uid: response.user.uid,
      displayName: response.user.displayName,
    };
    return userResponse;
  }

  signup( authData: SignupRequestInterface ): Observable<CurrentUserInterface> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(
        authData.user.email,
        authData.user.password,
      ),
    ).pipe(map(this.getUser),
      tap(a => this.router.navigate([ '/home' ])),
    );
  }

  login( authData: LoginRequestInterface ): Observable<CurrentUserInterface> {
    console.log(authData.user.email);
    return from(
      this.afAuth.signInWithEmailAndPassword(
        authData.user.email,
        authData.user.password,
      ),
    ).pipe(map(this.getUser),
     shareReplay(1)
    );
  }

  logout(): Observable<void> {
    this.router.navigate([ '/home' ]).then(
      a => alert('Logout'),
    );
    return from(this.afAuth.signOut());
  }
}
