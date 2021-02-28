import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormResolver } from '../resolvers/dynamic-form.resolver';
import { DynamicFormComponent } from './components/dynamic-form.component';

const routes: Routes = [
  {
    path: ':id', component: DynamicFormComponent, resolve: {
      fieldConfigs: DynamicFormResolver,
    },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DynamicFormsRoutingModule {}
