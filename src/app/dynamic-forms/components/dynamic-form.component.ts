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
import { map } from 'rxjs/operators';

interface cssPosition {
  gridColumnStart: number;
  gridColumnEnd: number;
  gridRowStart: number;
  gridRowEnd: number;
}

interface data2 extends FormlyFieldConfig, cssPosition {
  controlName: string;
  position: cssPosition;
  fieldConfig: FormlyFieldConfig;
}

interface style {
  style: string;
  value: string | number;
}

interface cssGrid extends style{
  display?: style;
  gridTemplateRows?: style;
  gridTemplateColumns?: style;
  gridTemplateAreas?: style;
  gridTemplate?: style;
  gridColumnGap?: style;
  gridRowGap?: style;
  gridGap?: style;
  justifyItems?: style;
  alignItems?: style;
  placeItems?: style;
  justifyContent?: style;
  alignContent?: style;
  placeContent?: style;
  gridAutoColumns?: style;
  gridAutoRows?: style;
  gridAutoFlow?: style;
  grid?: style;
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
  dbFieldsConfig: Observable<data2[]>;
  path: string;
  path2: string;
  path3: string;
  path4: string;
  grid: Observable<cssGrid[]>;
  help: string;

  constructor(
    private afs: AngularFirestore,
    private renderer: Renderer2,
    private route: ActivatedRoute ) {}

  ngOnInit() {
    this.getFormPath();
    this.getFieldsConfig();
    this.getFields();
    this.getCssGridConfig();
    this.setInvoiceNumber();
    this.getHelp();
  }

  ngAfterViewInit() {
    this.defineCssGrid();
    this.getCssPosition();
  }

  setInvoiceNumber() {
    this.path = this.path3;
  }

  getFormPath() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      let a = params.get('a');
      // let b = params.get('b');
      this.path2 = `${ id }/${ a }/producto`;
      this.path3 = `${ id }/${ a }/invoice`;
      this.path4 = `${ id }/${ a }/css`;
      console.log(this.path2);
      console.log(this.path4);
    });
  }

  getCssGridConfig() {
    this.grid = this.afs.collection(`${ this.path4 }`)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as cssGrid;
          const id = a.payload.doc.id;
          return { id, ...data };
        })),
        // tap(console.log),
      );
  }

  getFieldsConfig() {
    this.dbFieldsConfig = this.afs.collection(`${ this.path2 }`)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data.fieldConfig, ...data.position };
        })),
        // tap(console.log),
      );
  }

  getFields() {
    this.fields = this.dbFieldsConfig;
  }

  getCssPosition() {
    this.dbFieldsConfig.subscribe(a => {
      a.forEach(element => {
        const el: FormlyField = this.renderer.selectRootElement(
          `formly-field.${ element.className }`, true);
        // console.log(el);
        this.renderer.setAttribute(el, 'style',
          `grid-column-start: ${ element?.gridColumnStart }; 
                 grid-column-end: ${ element?.gridColumnEnd }; 
                 grid-row-start: ${ element?.gridRowStart }; 
                 grid-row-end: ${ element?.gridRowEnd } `);
      });
    });
  }

  defineCssGrid() {
    this.grid.subscribe(styles => {
      const formlyForm = this.renderer.selectRootElement('formly-form', true);
      console.log(styles);
      styles.forEach(b => {
        console.log(b);
        const s = Object.keys(b).map(k =>b[k]);
        s.forEach(c => {
          console.log(c?.value);
          this.renderer.setStyle(formlyForm, `${c?.style}`, `${c?.value}`);
        })
      });
    });
  }

  getHelp() {
    this.help = 'Esta es la información de ayuda para la forma, aquí te dirá' +
      ' como llenarla';
  }

  onSubmit() {
    console.log('onsubmit');
    console.log(this.model);
  }

}
