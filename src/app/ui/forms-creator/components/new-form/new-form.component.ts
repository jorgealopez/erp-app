import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormInterface } from '../../../../core/types/forms/form.interface';
import { FormsCreatorService } from '../../services/forms-creator.service';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: [ './new-form.component.scss' ],
})
export class NewFormComponent implements OnInit {

  formDialog: FormGroup;
  form: FormInterface;

  constructor(
    private fb: FormBuilder,
    private formsCreatorService: FormsCreatorService,
  ) {
    // this.form = form;
    this.createForm();
  }

  ngOnInit(): void {

  }

  createForm() {
    this.formDialog = this.fb.group({
      routerLink: [ '', Validators.required ],
      icon: [ '', Validators.required ],
      name: [ '', Validators.required ],
      order: [ '', Validators.required ],
      tooltip: [ '', Validators.required ],
    });
  }

  newSidenavItem() {
    console.log(this.formDialog.value);
    this.formsCreatorService.newSidenavItem(this.formDialog.value);
  }
}
