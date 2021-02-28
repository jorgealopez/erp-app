import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { onMainContentChange } from './ui/animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  animations: [ onMainContentChange ],
})
export class AppComponent implements OnInit {
  title = 'ficheros';
  theme = 'space-cadet-dark-theme';

  // form = new FormGroup({});
  // model = {};
  // options: FormlyFormOptions = {};
  // fields: Observable<FormlyFieldConfig[]>;
  // path: string = 'datos/doc1/doc2/doc3';
  // var: number;
  //
  // form2 = new FormGroup({});
  // model2 = {};
  // options2: FormlyFormOptions = {};
  // fields2: Observable<FormlyFieldConfig[]>;
  // path2: string = 'datos/doc1/doc2/doc5';

  constructor(
    private overlayContainer: OverlayContainer,
  ) {}

  ngOnInit() {
    // this.fields = this.afs.collection<FormlyFieldConfig[]>(
    //   'generalForms/materials/genericDescription')
    //   .valueChanges()
    //   .pipe(
    //     map(data => Object.keys(data).map(k => data[k])
    //       .sort(( a, b ) => a.order - b.order)),
    //     tap(console.log),
    //   );

    // this.var = 2;

    // this.fields2 = this.afs.collection<FormlyFieldConfig[]>(
    //   'generalForms/materials/spec')
    //   .valueChanges()
    //   .pipe(
    //     map(data => Object.keys(data).map(k => data[k])
    //       .sort(( a, b ) => a.order - b.order)),
    //     tap(console.log),
    //   );

    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }

  // onSubmit() {
  //   console.log(this.model);
  // }
  //
  // onSubmit2() {
  //   console.log(this.model2);
  // }

  onThemeChange( event ) {
    this.theme = event;
    this.overlayContainer.getContainerElement().classList.add(this.theme);
    console.log(this.theme);

    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(
      overlayContainerClasses,
    ).filter(( item: string ) => item.includes('-theme'));

    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.theme);
  }

}
