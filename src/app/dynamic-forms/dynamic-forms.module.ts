import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { DynamicFormComponent } from './components/dynamic-form.component';
import { DynamicFormsRoutingModule } from './dynamic-forms-routing.module';


@NgModule({
  declarations: [ DynamicFormComponent ],
  imports: [
    CommonModule,
    DynamicFormsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyMaterialModule,
    SharedModule,
  ],
})
export class DynamicFormsModule {}
