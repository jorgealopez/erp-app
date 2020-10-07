import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-panel-wrapper',
  template: `
    <mat-card>
      <mat-card-actions>{{ to.label }}</mat-card-actions>
      <mat-divider></mat-divider>
      <div>
        <ng-container #fieldComponent></ng-container>
      </div>
    </mat-card>
  `,
  styles: [
  ]
})
export class PanelWrapperComponent extends FieldWrapper{




}
