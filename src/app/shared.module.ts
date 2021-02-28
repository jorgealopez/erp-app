import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FireFormDirective } from './ui/directives/fire-form.directive';
import { MaterialModule } from './material.module';
import { MenuListItemComponent } from './ui/menu-list-item/menu-list-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuListItemComponent, FireFormDirective],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  exports: [MenuListItemComponent, FireFormDirective],
})
export class SharedModule {}
