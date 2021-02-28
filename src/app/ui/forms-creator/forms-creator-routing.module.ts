import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldListComponent } from './components/field-list/field-list.component';
import { FormsCreatorShellComponent } from './components/forms-creator-shell/forms-creator-shell.component';
import { FormResolver } from './services/form.resolver';


const routes: Routes = [
  { path: '', component: FormsCreatorShellComponent },
  {
    path: 'app-field-list/:formUrl', component: FieldListComponent, resolve: {
      form: FormResolver,
    },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class FormsCreatorRoutingModule {}
