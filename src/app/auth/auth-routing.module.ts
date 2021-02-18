import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo, redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ 'forms-creator' ]);

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [ AngularFireAuthGuard ],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AuthRoutingModule {}
