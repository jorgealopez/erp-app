import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import cleanDeep from 'clean-deep';
import { Observable } from 'rxjs';
import { FormInterface } from '../../../types/forms/form.interface';
import { FormsCreatorService } from '../../services/forms-creator.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: [ './form-dialog.component.scss' ],
})
export class FormDialogComponent implements OnInit {

  formDialog: FormGroup;
  description: string;
  form: FormInterface;

  uploadPercent$: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) form: FormInterface,
    private formsCreatorService: FormsCreatorService,
    private storage: AngularFireStorage ) {
     this.form = form;
    // this.formDialog = this.fb.group({
    //   title: [ this.form?.title, Validators.required ],
    //   formName: [ this.form?.formName, Validators.required ],
    //   description: [ this.form?.description, Validators.required ],
    //   numberOfFields: [ this.form?.numberOfFields, Validators.required ],
    //   documentedInformationControl: this.fb.group({
    //     approvedBy: [ this.form?.documentedInformationControl?.approvedBy, Validators.required ],
    //     elaboratedBy: [ this.form?.documentedInformationControl?.elaboratedBy, Validators.required ],
    //     modifiedBy: [ this.form?.documentedInformationControl?.modifiedBy, Validators.required ],
    //     version: [ this.form?.documentedInformationControl?.version, Validators.required ],
    //   }),
    // });
  }

  ngOnInit(): void {
    console.log(this.form);
    this.initializeForm();
    this.setActualFormControls(this.form);
  }

  private initializeForm() {
    this.formDialog = this.fb.group({
      title: [ '', Validators.required ],
      id: [ '', Validators.required ],
      url: [ '', Validators.required ],
      formName: [ '', Validators.required ],
      description: [ '', Validators.required ],
      numberOfFields: [ '', Validators.required ],
      documentedInformationControl: this.fb.group({
        approvedBy: [ '', Validators.required ],
        elaboratedBy: [ '', Validators.required ],
        modifiedBy: [ '', Validators.required ],
        version: [ '', Validators.required ],
      }),
    });
  }

  private setActualFormControls(form: FormInterface) {
    Object.entries(form).forEach(item => {
      if (item[1] === Object(item[1])) {
        Object.entries(item[1]).forEach(i => {
          this.formDialog.get(`${item[0]}.${i[0]}`).patchValue(i[1]);
        })
      }else {
        this.formDialog.controls[`${item[0]}`].setValue(item[1]);
      }
    })
  }

  save() {
    const changes = this.formDialog.value;
    const b = {
      'title': changes.title,
      'formName': changes.formName,
      'description': changes.description,
      'numberOfFields': changes.numberOfFields,
      'documentedInformationControl.approvedBy': changes.documentedInformationControl.approvedBy,
      'documentedInformationControl.elaboratedBy': changes.documentedInformationControl.elaboratedBy,
      'documentedInformationControl.modifiedBy': changes.documentedInformationControl.modifiedBy,
      'documentedInformationControl.version': changes.documentedInformationControl.version,
    };

    this.formDialog.value.id = '';
    const x = cleanDeep(changes);
    console.log(x);

    this.formsCreatorService.saveForm(this.form.id, x)
      .subscribe(
        () => this.dialogRef.close(this.formDialog.value),
      );
  }

  newForm() {
    this.formsCreatorService.newForm(this.formDialog.value)
      // .subscribe(
      //   () => this.dialogRef.close(this.formDialog.value),
      // );
  }

  close() {
    this.dialogRef.close();
  }


}
