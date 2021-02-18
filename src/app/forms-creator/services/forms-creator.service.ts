import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FieldInterface } from '../../types/forms/field.interface';
import { FormInterface } from '../../types/forms/form.interface';
import { SidenavItemInterface } from '../../types/ui/sidenav-item.interface';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class FormsCreatorService {

  constructor(private db: AngularFirestore) { }

  saveForm(formId:string, changes: Partial<FormInterface>): Observable<any> {

    return from(this.db.doc(`dynamic-forms/${formId}`).update(changes));

  }

  newForm(form) {
    const id = form.formName;
    this.db.collection('dynamic-forms').doc(id).set(form);
  }

  newSidenavItem(form:SidenavItemInterface) {
    const id = form.name;
    this.db.collection('UI-configuration/sidenav/menu-items').doc(id).set(form);
  }

  loadAllForms(): Observable<FormInterface[]> {
      return this.db.collection('dynamic-forms').snapshotChanges().pipe(
        map(snaps => convertSnaps<FormInterface>(snaps) ),
        first());
  }

  findFormByUrl(formUrl: string) {
    return this.db.collection('dynamic-forms',
        ref => ref.where("url", "==", formUrl))
      .snapshotChanges()
      .pipe(
        map(snaps => {
          const forms = convertSnaps<FormInterface>(snaps);
          console.log(forms[0]);
          return forms.length == 1 ? forms[0]: undefined;
        }
      ),
      first()
      )
  }

  findFields(formId:string):Observable<FieldInterface[]> {

    return this.db.collection(`dynamic-forms/${formId}/fields`)
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<FieldInterface>(snaps))
      )

  }


  saveCssGridProperties( value: any ) {
    this.db.collection('dynamic-forms/tenis/css').doc('cssGrid').update(value).then(
      a => alert('guardado')
    );
  }
}
