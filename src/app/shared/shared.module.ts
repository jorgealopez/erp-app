import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuListItemComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  exports: [MenuListItemComponent],
})
export class SharedModule {}
