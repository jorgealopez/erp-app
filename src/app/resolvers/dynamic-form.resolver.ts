import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, shareReplay, take } from 'rxjs/operators';
import { convertSnaps } from '../forms-creator/services/db-utils';
import { FieldConfig } from '../types/forms/field.interface';
import { FormInterface } from '../types/forms/form.interface';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormResolver implements Resolve<FieldConfig[]> {

  constructor( private afs: AngularFirestore) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FieldConfig[]> {
    // return of(true);
    const id = route.paramMap.get('id');
    // console.log(id);
    return this.afs.collection(`dynamic-forms/${id}/fields`).snapshotChanges()
      .pipe(
      map(snaps => {
        const fieldConfigs = convertSnaps<FieldConfig>(snaps);
        console.log(fieldConfigs);
        return fieldConfigs;
      }
    ),
        first()
    );
  }
}
