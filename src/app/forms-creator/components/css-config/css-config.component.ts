import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import cleanDeep from 'clean-deep';
import { cssGrid } from '../../../types/css/css-grid';
import { FormsCreatorService } from '../../services/forms-creator.service';

export interface propertyValue {
  key: string,
  property: string | number,
  value: string | number
}

@Component({
  selector: 'app-css-config',
  templateUrl: './css-config.component.html',
  styleUrls: [ './css-config.component.scss' ],
})
export class CssConfigComponent implements OnInit {

  form: FormGroup;
  array = [];
  props: cssGrid = {
    display: { style: 'display', value: 'grid' },
    gridGap: { style: 'grid-gap', value: '10px' },
    gridTemplateRows: { style: 'grid-template-rows', value: '' },
    gridTemplateColumns: {
      style: 'grid-template-columns',
      value: 'repeat(auto-fill, minmax(350px, 1fr))',
    },
    gridTemplateAreas: { style: 'grid-template-areas', value: '' },
    gridTemplate: { style: 'grid-template', value: '' },
    gridColumnGap: { style: 'grid-column-gap', value: '' },
    gridRowGap: { style: 'grid-row-gap', value: '' },
    gridAutoColumns: { style: 'grid-auto-columns', value: '' },
    gridAutoRows: { style: 'grid-auto-rows', value: '75px' },
    gridAutoFlow: { style: 'grid-auto-flow', value: 'dense' },
    grid: { style: 'grid', value: '' },
    justifyItems: { style: 'justify-items', value: '' },
    alignItems: { style: 'align-items', value: 'center' },
    placeItems: { style: 'place-items', value: '' },
    justifyContent: { style: 'justify-content', value: '' },
    alignContent: { style: 'align-content', value: '' },
    placeContent: { style: 'place-content', value: '' },
  };
  cssProps: propertyValue[] = [
    { key: 'display', property: 'display', value: 'grid' },
    { key: 'gridTemplateRows', property: 'grid-template-rows', value: 'b' },
    { key: 'gridTemplateColumns', property: 'grid-row-gap', value: 'c' },
    { key: 'gridTemplateAreas', property: 'grid-row-gap2', value: 'ce' },
    { key: 'gridTemplate', property: 'grid-row-gap3', value: 'cd' },
    { key: 'gridColumnGap', property: 'grid-row-gap3', value: 'cd' },
    { key: 'gridRowGap', property: 'grid-row-gap3', value: 'cd' },
    { key: 'gridGap', property: 'grid-row-gap3', value: 'cd' },
    { key: 'justifyItems', property: 'grid-row-gap3', value: 'cd' },
    { key: 'alignItems', property: 'grid-row-gap3', value: 'cd' },
  ];

  constructor(
    private fb: FormBuilder,
    private formsCreatorService: FormsCreatorService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.toArray(this.props);
  }

  initializeForm() {
    this.form = this.fb.group({
      items: this.toFormGroup(this.props),
    });
  }

  onSubmit() {
    // console.log(this.form.value);
    let cleanField = cleanDeep(this.form.value);
    this.formsCreatorService.saveCssGridProperties(cleanField);
  }

  toFormGroup2( cssProps: propertyValue[] ) {
    const group: any = {};

    cssProps.forEach(prop => {
      group[prop.key] = new FormGroup({
        property: new FormControl({
          value: `${ prop.property }`, disabled: true,
        }),
        value: new FormControl(`${ prop.value }`),
      });

      console.log(group);

    });
    return new FormGroup(group);
  }

  toFormGroup( cssProps: cssGrid ) {
    const group: any = {};

    Object.entries(cssProps).forEach(prop => {
      console.log(prop);
      console.log(prop[0]);
      console.log(prop[1].style);
      console.log(prop[1].value);

      group[prop[0]] = new FormGroup({
        property: new FormControl(
          { value: `${ prop[1].style }`, disabled: true }),
        value: new FormControl(`${ prop[1].value }`),
      });

      console.log(group);
    });
    return new FormGroup(group);
  }

  toArray( obj: cssGrid ) {
    let a = {};
    Object.entries(obj).forEach(prop => {
      a['key'] = prop[0];
      a['property'] = prop[1].style;
      a['value'] = prop[1].value;
      this.array.push(a);
      a = {};
      console.log(this.array);
    });
  }

}

