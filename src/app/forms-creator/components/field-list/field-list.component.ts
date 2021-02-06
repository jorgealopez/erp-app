import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FieldInterface } from '../../../types/forms/field.interface';
import { FormInterface } from '../../../types/forms/form.interface';
import { FormsCreatorService } from '../../services/forms-creator.service';
import { FormsCreatorComponent } from '../forms-creator/forms-creator.component';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: [ './field-list.component.scss' ],
})
export class FieldListComponent implements OnInit {

  displayedColumns: string[] = [ 'control name', 'key', 'class name', 'order', 'actions' ];
  fields: Observable<FieldInterface[]>;
  // forms: Observable<any[]>;
  form: FormInterface;
  // selectedValue: any;
  // fields: FieldInterface[];

  constructor(
    private afs: AngularFirestore,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formsCreatorService: FormsCreatorService ) { }

  ngOnInit(): void {
    // this.forms = this.afs.collection('dynamic-forms').valueChanges();
    this.form = this.route.snapshot.data['form'];
    console.log(this.form);
    this.formsCreatorService.findFields(this.form.id)
      .pipe()
      .subscribe(
        fields => this.fields = of(fields)
      );
  }

  edit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = [];

    this.dialog.open(FormsCreatorComponent, dialogConfig);
  }

  new() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = [];

    this.dialog.open(FormsCreatorComponent, dialogConfig);
  }

  delete( element ) {
    console.log(element.controlName);

    this.afs.collection(`dynamic-forms/nuevo-producto/producto`)
      .doc(`${ element.fieldConfig.controlName }`).delete();
  }

  onRowClicked( row: any ) {
    console.log(row);
  }

  // selectForm( value: any ) {
  //   console.log(value);
  //   this.elements = this.afs.collection(`dynamic-forms/empleado/${ value }`)
  //     .valueChanges();
  // }
}
