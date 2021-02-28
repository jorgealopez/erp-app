import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormInterface } from '../../../../core/types/forms/form.interface';
import { CssConfigComponent } from '../css-config/css-config.component';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { NewFormComponent } from '../new-form/new-form.component';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: [ './forms-list.component.scss' ],
})
export class FormsListComponent implements OnInit {

  @Input()
  forms: FormInterface[];

  @Output()
  formEdited = new EventEmitter();

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  editForm( form: FormInterface ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = form;
    console.log(form);

    this.dialog.open(FormDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
          this.formEdited.emit();
        }
      });
  }

  newForm() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // dialogConfig.data = form;
    // console.log(form);

    this.dialog.open(FormDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
          this.formEdited.emit();
        }
      });
  }

  sidenavCofig() {
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(NewFormComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
          this.formEdited.emit();
        }
      })
  }

  editCss() {
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(CssConfigComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
          this.formEdited.emit();
        }
      })
  }
}
