import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormComponent } from './components/dynamic-form.component';

const routes: Routes = [
  { path: '', component: DynamicFormComponent },
  { path: ':id/:a/:b', component: DynamicFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicFormsRoutingModule { }
