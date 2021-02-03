import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormsCreatorService } from '../../services/forms-creator.service';

interface style {
  style?: string;
  value?: string | number;
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
  selector: 'app-css-config',
  templateUrl: './css-config.component.html',
  styleUrls: [ './css-config.component.scss' ],
})
export class CssConfigComponent implements OnInit {

  formDialog: FormGroup;
  cssProps: any[] = [
    { key: 'display', style: 'display', value: '' },
    { key: 'gridTemplateRows', style: 'grid-template-rows', value: '' },
    { key: 'gridRowGap', style: 'grid-row-gap', value: '' },
  ];
  // cssProps: cssGrid[] = [
  //   { display: { style: 'display', value: '' } },
  //   { gridTemplateRows: { style: 'grid-template-rows', value: '' } },
  // ];


  constructor(
    private fb: FormBuilder,
    private formsCreatorService: FormsCreatorService,
  ) {}

  get cssGridProperties(): FormArray {
    return this.formDialog.get('cssGrid') as FormArray;
  }

  addCssGridProperty() {
    this.cssGridProperties.push(this.cssGridProp());
  }

  ngOnInit(): void {
    this.createForm();
  }

  cssConfig() {
    console.log(this.formDialog.value);
    this.formsCreatorService.saveCssGridProperties(this.formDialog.value);
    // console.log(this.cssProps);
  }

  // private createForm() {
  //   this.formDialog = this.fb.group({
  //     cssGrid: this.fb.array([
  //       this.cssGridProp(),
  //     ]),
  //   });
  // }

  private createForm() {
    this.formDialog = this.fb.group({
      display: this.fb.group({
        style: [ 'display' ],
        value: [ '' ],
      }),
      gridTemplateRows: this.fb.group({
        style: [ 'grid-template-rows' ],
        value: [ '' ],
      }),
      gridTemplateColumns: this.fb.group({
        style: [ 'grid-template-columns' ],
        value: [ '' ],
      }),
      gridTemplateAreas: this.fb.group({
        style: [ 'grid-template-areas' ],
        value: [ '' ],
      }),
      gridTemplate: this.fb.group({
        style: [ 'grid-template' ],
        value: [ '' ],
      }),
      gridColumnGap: this.fb.group({
        style: [ 'grid-column-gap' ],
        value: [ '' ],
      }),
      gridRowGap: this.fb.group({
        style: [ 'grid-row-gap' ],
        value: [ '' ],
      }),
      gridGap: this.fb.group({
        style: [ 'grid-gap' ],
        value: [ '' ],
      }),
      justifyItems: this.fb.group({
        style: [ 'justify-items' ],
        value: [ '' ],
      }),

    });
  }

  private cssGridProp() {
    return this.fb.group({

      style: [ 'a' ],
      value: [ 'b' ],
    });

  }

}

