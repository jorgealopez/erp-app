import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialesRoutingModule } from './materiales-routing.module';
import { MaterialComponent } from './material/material.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [MaterialComponent],
  imports: [
    CommonModule,
    MaterialesRoutingModule,
    FontAwesomeModule,
    MaterialModule,
  ],
})
export class MaterialesModule {}
