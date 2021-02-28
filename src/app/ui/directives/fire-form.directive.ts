import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[fireForm]',
})
export class FireFormDirective implements OnInit, OnDestroy {

  @Input() path: string;
  @Input() formGroup: FormGroup;
  @Output() stateChange = new EventEmitter<string>();
  @Output() formError = new EventEmitter<string>();
  // Firestore Document
  private docRef: AngularFirestoreDocument;
  // Subscriptions
  private formSub: Subscription;

  constructor( private afs: AngularFirestore ) { }

  private _state: 'loading' | 'synced' | 'modified' | 'error';

  // Setter for state changes
  set state( val ) {
    this._state = val;
    this.stateChange.emit(val);
  }

  ngOnInit() {
    this.preloadData();
    this.autoSave();
  }

  // Loads initial form data from Firestore
  preloadData() {
    this.state = 'loading';
    this.docRef = this.getDocRef(this.path);
    this.docRef
      .valueChanges()
      .pipe(
        tap(doc => {
          if (doc) {
            this.formGroup.patchValue(doc);
            this.formGroup.markAsPristine();
            this.state = 'synced';
          }
        }),
        take(1),
      )
      .subscribe();
  }

  // Auto saves form changes
  autoSave() {
    this.formSub = this.formGroup.valueChanges
      .pipe(
        tap(change => {
          this.state = 'modified';
        }),
        debounceTime(2000),
        tap(change => {
          if (this.formGroup.valid && this._state === 'modified') {
            this.setDoc();
          }
        }),
      )
      .subscribe();
  }

  @HostListener('ngSubmit', [ '$event' ])
  onSubmit( e ) {
    this.setDoc();
  }

  // Determines if path is a collection or document
  getDocRef( path: string ): any {
    if (path.split('/').length % 2) {
      return this.afs.doc(`${ path }/${ this.afs.createId() }`);
    } else {
      return this.afs.doc(path);
    }
  }

  // Writes changes to Firestore
  async setDoc() {
    try {
      await this.docRef.set(this.formGroup.value, { merge: true });
      this.state = 'synced';
    } catch (err) {
      console.log(err);
      this.formError.emit(err.message);
      this.state = 'error';
    }
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }

}
