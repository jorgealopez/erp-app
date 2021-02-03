import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FireFormDirective } from '../directives/fire-form.directive';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsCreatorComponent } from './components/forms-creator/forms-creator.component';

import { FormsCreatorRoutingModule } from './forms-creator-routing.module';
import { FieldListComponent } from './components/field-list/field-list.component';
import { FormsCreatorShellComponent } from './components/forms-creator-shell/forms-creator-shell.component';
import { FormsListComponent } from './components/forms-list/forms-list.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { FormResolver } from './services/form.resolver';
import { NewFormComponent } from './components/new-form/new-form.component';
import { CssConfigComponent } from './components/css-config/css-config.component';


@NgModule({
  declarations: [ FormsCreatorComponent, FieldListComponent, FormsCreatorShellComponent, FormsListComponent, FormDialogComponent, NewFormComponent, CssConfigComponent ],
  imports: [
    CommonModule,
    FormsCreatorRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormlyModule,
    FormsModule,
  ],
  providers: [FormResolver],
  entryComponents: [FormDialogComponent]
})
export class FormsCreatorModule {}
