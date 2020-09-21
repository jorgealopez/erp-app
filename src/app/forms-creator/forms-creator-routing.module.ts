import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsCreatorComponent } from './components/forms-creator/forms-creator.component';


const routes: Routes = [
  { path: '', component: FormsCreatorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsCreatorRoutingModule { }
