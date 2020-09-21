import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class FormsFirestore<T> implements IFormsService<T> {
  protected constructor( private afs: AngularFirestore ) {}

  doc$( basePath: string, id: string ): Observable<T> {
    return this.afs
      .doc<T>(`${ basePath }/${ id }`)
      .valueChanges();
      // .pipe(
      //   shareReplay()
      // );
  }
}

@Injectable({
  providedIn: 'root',
})
export class FormsService<T> {
  basePath: string;
  id: string;

  constructor( private ffs: FormsFirestore<T>, private fb: FormBuilder) {}

  doc$( basePath, id ): Observable<T> {
    return this.ffs.doc$(basePath, id);
  };

  initializeForm(): FormGroup {
    return this.fb.group({
      username: [ '', Validators.required ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(6)]],
      checkbox: [ '', Validators.required ],
    })
  }
}


export abstract class IFormsService<T> {
  abstract doc$( basePath: string, id: string ): Observable<T>;
}

// export class FormsService implements IFormsService<Form>{
//   constructor(private fs: AngularFirestore) {}
//   doc$( basePath: string, id: string ): Observable<Form> {
//     return
//   }
// }
