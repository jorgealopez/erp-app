import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard, redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { FormsCreatorShellComponent } from './forms-creator/components/forms-creator-shell/forms-creator-shell.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


// const redirectLoggedInToItems = () => redirectLoggedInTo([ 'forms-creator' ]);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(( m ) => m.AuthModule),
  },
  {
    path: 'forms-creator',
    loadChildren: () =>
      import('./forms-creator/forms-creator.module').then(
        ( m ) => m.FormsCreatorModule),
    canLoad: [AuthGuard],

    // canActivate: [ AngularFireAuthGuard ],
    // data: { authGuardPipe: redirectLoggedInToItems },
  },
  {
    path: 'dynamic-forms',
    loadChildren: () =>
      import('./dynamic-forms/dynamic-forms.module').then(
        ( m ) => m.DynamicFormsModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employees/employees.module').then(( m ) => m.EmployeesModule),
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
