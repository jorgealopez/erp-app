import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FireFormDirective } from '../directives/fire-form.directive';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsCreatorComponent } from './components/forms-creator/forms-creator.component';

import { FormsCreatorRoutingModule } from './forms-creator-routing.module';


@NgModule({
  declarations: [ FormsCreatorComponent ],
  imports: [
    CommonModule,
    FormsCreatorRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormlyModule,
  ],
})
export class FormsCreatorModule {}
