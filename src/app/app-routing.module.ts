import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: '**', component: NotFoundComponent, pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(( m ) => m.AuthModule),
  },
  {
    path: 'forms-creator',
    loadChildren: () =>
      import('./forms-creator/forms-creator.module').then((m) => m.FormsCreatorModule),
  },
  {
    path: 'dynamic-forms',
    loadChildren: () =>
      import('./dynamic-forms/dynamic-forms.module').then(( m ) => m.DynamicFormsModule),
  },
  {
    path: 'creador',
    loadChildren: () =>
      import('./forms-creator/forms-creator.module').then(( m ) => m.FormsCreatorModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employees/employees.module').then(( m ) => m.EmployeesModule),
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
