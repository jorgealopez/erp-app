import { Component, NgModule } from '@angular/core';
import {
  AngularFireAuthGuard, redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ui/auth/components/login/login.component';
import { SignupComponent } from './ui/auth/components/signup/signup.component';
import { FormsCreatorShellComponent } from './ui/forms-creator/components/forms-creator-shell/forms-creator-shell.component';
import { AuthGuard } from './ui/guards/auth.guard';
import { HomeComponent } from './ui/home/home.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';


// const redirectLoggedInToItems = () => redirectLoggedInTo([ 'forms-creator' ]);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/login', component: LoginComponent},
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./auth/auth.module').then(( m ) => m.AuthModule),
  // },
  {
    path: 'forms-creator',
    loadChildren: () =>
      import('./ui/forms-creator/forms-creator.module').then(
        ( m ) => m.FormsCreatorModule),
    canLoad: [AuthGuard],

    // canActivate: [ AngularFireAuthGuard ],
    // data: { authGuardPipe: redirectLoggedInToItems },
  },
  {
    path: 'dynamic-forms',
    loadChildren: () =>
      import('./ui/dynamic-forms/dynamic-forms.module').then(
        ( m ) => m.DynamicFormsModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./ui/employees/employees.module').then(( m ) => m.EmployeesModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,
    {
      enableTracing: false,
      relativeLinkResolution: 'legacy',
    }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
