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

interface data2 extends FormlyFieldConfig, style {
  controlName: string;
  css: style[];
  fieldConfig: FormlyFieldConfig;
}

interface style {
  style: string;
  value: string | number;
}

interface cssGrid extends style {
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
  dbFieldsPath: string;
  dbInvoicePath: string;
  dbCssPath: string;
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

  getFormPath() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      let a = params.get('a');
      // let b = params.get('b');
      this.dbFieldsPath = `${ id }/${ a }/fields`; // FIXME: Modificar
      // la url
      this.dbInvoicePath = `${ id }/${ a }/invoice`;
      this.dbCssPath = `${ id }/${ a }/css`;
      console.log(this.dbFieldsPath);
      console.log(this.dbCssPath);
    });
  }

  getFieldsConfig() {
    this.dbFieldsConfig = this.afs.collection(`${ this.dbFieldsPath }`,
      ref => ref.orderBy('fieldConfig.order'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data.fieldConfig, css: {...data.css }};
        })),
        // tap(console.log),
      );
  }

  getFields() {
    this.fields = this.dbFieldsConfig;
  }

  getCssGridConfig() {
    this.grid = this.afs.collection(`${ this.dbCssPath }`)
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

  setInvoiceNumber() {
    this.path = this.dbInvoicePath;
  }

  getHelp() {
    this.help = 'Esta es la información de ayuda para la forma, aquí te dirá' +
      ' como llenarla';
  }

  defineCssGrid() {
    this.grid.subscribe(styles => {
      const formlyForm = this.renderer.selectRootElement('formly-form', true);
      console.log(styles);
      styles.forEach(b => {
        console.log(b);
        const s = Object.keys(b).map(k => b[k]);
        s.forEach(c => {
          console.log(c?.value);
          this.renderer.setStyle(formlyForm, `${ c?.style }`, `${ c?.value }`);
        });
      });
    });
  }

  // FIXME:
  getCssPosition() {
    this.dbFieldsConfig.subscribe(s => {
      console.log(s);
      s.forEach(element => {
        const el: FormlyField = this.renderer.selectRootElement(
          `formly-field.${ element?.controlName }`, true);
        // console.log(el);

        const css = Object.keys(element?.css).map(k => element?.css[k]);
        console.log(css);

        css.forEach(style => {
          console.log(style?.value);
        this.renderer.setStyle(el, `${ style?.style }`,
          `${ style?.value }`);
        })

      });
    });
  }

  onSubmit() {
    console.log('onsubmit');
    console.log(this.model);
  }

}
