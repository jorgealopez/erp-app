import {
  AfterViewInit,
  Component, OnChanges, OnDestroy,
  OnInit,
  Renderer2, SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

import {
  FormlyField,
  FormlyFieldConfig,
  FormlyFormOptions,
} from '@ngx-formly/core';

import { Observable } from 'rxjs';
import { first, last, map, shareReplay, take } from 'rxjs/operators';
import { getUrlPathWithOutFirstSlash } from '../../../core/helpers/getUrlPath';
import { cssGrid } from '../../../core/types/css/css-grid';
import { style } from '../../../core/types/css/style';
import { FieldConfig } from '../../../core/types/forms/field.interface';

interface data2 extends FormlyFieldConfig, style {
  controlName: string;
  css: style[];
  fieldConfig: FormlyFieldConfig;
}

@Component({
  selector: 'app-dynamic-form',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './dynamic-form.component.scss' ],
  templateUrl: './dynamic-form.component.html',
})

export class DynamicFormComponent implements OnInit, AfterViewInit, OnDestroy {
  form = new FormGroup({});
  path: string;

  model = {};
  options: FormlyFormOptions = {};
  fields: Observable<FormlyFieldConfig[]>;

  dbFieldsConfig: Observable<data2[]>;
  dbFormFieldsPath: string;
  dbInvoicePath: string;
  dbCssPath: string;

  grid: Observable<cssGrid[]>;
  help: string;

  f: Observable<FieldConfig[]>;
  private sub: any;

  constructor(
    private afs: AngularFirestore,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.getDbFormPaths();
      this.getFieldsConfig();
      this.getFields();
      this.getCssGridConfig();
      this.setInvoiceNumber();
      this.getHelp();
    })
  }

  ngAfterViewInit() {
    this.defineCssGrid();
    this.getCssPosition();
  }

  getDbFormPaths() {
    console.log(`params`);
    const collectionPath = getUrlPathWithOutFirstSlash(this.router);
    this.dbFormFieldsPath = `${ collectionPath }/fields`;
    this.dbInvoicePath = `${ collectionPath }/invoice`;
    this.dbCssPath = `${ collectionPath }/css`;
  }

  getFieldsConfig() {
    this.dbFieldsConfig = this.afs.collection(`${ this.dbFormFieldsPath }`,
      ref => ref.orderBy('fieldConfig.order'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          console.log('carga información');
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data.fieldConfig, css: { ...data.css } };
        })),
        // first()
        // shareReplay()
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
        });

      });
    });
  }

  onSubmit() {
    console.log('onsubmit');
    console.log(this.model);
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.sub.unsubscribe();
  }

}
