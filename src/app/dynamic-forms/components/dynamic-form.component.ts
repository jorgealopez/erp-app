import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  FormlyField,
  FormlyFieldConfig,
  FormlyFormOptions,
} from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface cssPosition {
  gridColumnStart: number;
  gridColumnEnd: number;
  gridRowStart: number;
  gridRowEnd: number;
}

interface data2 extends FormlyFieldConfig{
  controlName: string;
  position: cssPosition;
}

@Component({
  selector: 'app-dynamic-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './dynamic-form.component.scss' ],
  templateUrl: './dynamic-form.component.html',
})

export class DynamicFormComponent implements OnInit, AfterViewInit {
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  fields: Observable<FormlyFieldConfig[]>;
  path: string = 'datos/doc1/doc2/doc3';
  path2: string;
  data: Observable<data2[]>;

  constructor(
    private afs: AngularFirestore,
    private renderer: Renderer2,
    private route: ActivatedRoute ) {}

  ngOnInit() {
    this.getFormPath();
    this.getData();
    this.getFields();
  }

  ngAfterViewInit() {
    this.getCssPosition();
  }

  // Obtiene el path de firestore en donde está alojada la configuración de
  // campos de la forma
  getFormPath() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      let a = params.get('a');
      let b = params.get('b');
      this.path2 = `${ id }/${ a }/${ b }`;
      console.log(this.path2);
    });
  }

  getData() {
    this.data = this.afs.collection(`${ this.path2 }`)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Observable<data2[]>;
          const id = a.payload.doc.id;
          return { id, ...data };
        })),
        tap(console.log),
      );
  }

  getFields() {
    this.fields = this.data;
  }

  getCssPosition() {
    const px = '25px';
    const r = 10;
    const formlyForm = this.renderer.selectRootElement('formly-form', true);
    this.renderer.setStyle(formlyForm, 'grid-template-columns',
      `repeat(${ r }, ${ px })`);

    this.data.subscribe(a => {
      a.forEach(element => {
        const css = element.position;
        console.log(css?.gridColumnStart);
        const el: FormlyField = this.renderer.selectRootElement(
          `formly-field.${ element.className }`, true);
        console.log(el);
        this.renderer.setStyle(el, 'grid-column-start', `${ css?.gridColumnStart }`);
        this.renderer.setStyle(el, 'grid-column-end', `${ css?.gridColumnEnd }`);
        this.renderer.setStyle(el, 'grid-row-start', `${ css?.gridRowStart }`);
        this.renderer.setStyle(el, 'grid-row-end', `${ css?.gridRowEnd }`);
      });
    });
  }

  onSubmit() {
    console.log('onsubmit');
    console.log(this.model);
  }

}
