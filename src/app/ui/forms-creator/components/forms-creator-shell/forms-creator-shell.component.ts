import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormInterface } from '../../../../core/types/forms/form.interface';
import { FormsCreatorService } from '../../services/forms-creator.service';

@Component({
  selector: 'app-forms-creator-shell',
  templateUrl: './forms-creator-shell.component.html',
  styleUrls: [ './forms-creator-shell.component.scss' ],
})
export class FormsCreatorShellComponent implements OnInit {

  forms$: Observable<FormInterface[]>;

  constructor(
    private afs: AngularFirestore,
    private formsCreatorService: FormsCreatorService ) { }

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms() {
    this.forms$ = this.formsCreatorService.loadAllForms();
  }

}
