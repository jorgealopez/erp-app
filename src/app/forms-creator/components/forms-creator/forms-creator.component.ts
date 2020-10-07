import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-forms-creator',
  templateUrl: './forms-creator.component.html',
  styleUrls: [ './forms-creator.component.scss' ],
})
export class FormsCreatorComponent implements OnInit {
  form: FormGroup;
  path: string = 'datos';
  controlName: string;
  firebasePath: string;
  validatorsKey: string;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.initializeForm();
    // this.firebasePath = this.form.get('firebasePath').value;
  }

  // FIXME: Definir campos obligatorios y expresiones regulares
  initializeForm(): void {
    this.form = this.fb.group({
      firebasePath: [],
      controlName: [],
      key: [ '', Validators.required ],
      type: [],
      defaultValue: [],
      id: [],
      name: [],
      template: [],
      hide: [],
      hideExpression: [],
      className: [],
      fieldGroupClassName: [],
      focus: [],

      validation: this.validation(),
      validators: this.validators(),
      asyncValidators: this.asyncValidators(),
      wrappers: this.wrappers(),
      expressionProperties: this.expressionProperties(),
      parsers: this.parsers(),
      fieldArray: this.fieldArray(),
      fieldGroup: this.fieldGroup(),
      templateOptions: this.templateOptions(),
      hooks: this.hooks(),
      modelOptions: this.modelOptions(),

      // TODO: VALIDATION
  //     validation?: {
  //       messages?: {
  //         [messageProperties: string]: ValidationMessageOption['message'];
  // };
  //   show?: boolean;
  //   [additionalProperties: string]: any;
  // };

  });
  }

  public validation() {

  }
// TODO: Añadir método para añadir al Array el grupo de campos
  private validators() {
   return this.fb.array([
      this.fb.group({
            key: [],
            expression: [],
            message: []
      })
    ])
  }

// TODO: Añadir método para añadir al Array el grupo de campos
  private asyncValidators() {
    return this.fb.array([
      this.fb.group({
        key: [],
        expression: [],
        message: []
      })
    ])
  }

  private templateOptions() {
    return this.fb.group({
      type: [],
      label: [],
      placeholder: [],
      disabled: [],
      options: [],
      rows: [],
      cols: [],
      description: [],
      hidden: [],
      max: [],
      min: [],
      minLength: [],
      maxLength: [],
      pattern: [],
      required: [],
      tabindex: [],
      readonly: [],
      attributes: [],
      step: [],
      focus: [],
      blur: [],
      keyup: [],
      keydown: [],
      click: [],
      change: [],
      keypress: [],
    })
  }

  private fieldGroup() {
    return this.fb.array([
      this.fg()
    ])
  }

  private fg() {
    return this.fb.group({
      key: [],
      type: [],
      defaultValue: [],
      id: [],
      name: [],
      validators: this.validators(),
      asyncValidators: this.asyncValidators(),
      template: [],
      wrappers: this.wrappers(),
      hide: [],
      hideExpression: [],
      expressionProperties: this.expressionProperties(),
      className: [],
      fieldGroupClassName: [],
      focus: [],
      parsers: this.parsers(),
      // fieldArray: this.fieldArray(),
      templateOptions: this.templateOptions(),
      hooks: this.hooks(),
      modelOptions: this.modelOptions()
      // fieldGroup: this.fg()
    })
  }

  private fieldArray() {
      return this.form
  }

  private expressionProperties() {
    return this.fb.group({
      property: [],
      string: []
    })
  }

  private modelOptions() {
    return this.fb.group({
      debounce: this.fb.group({
        default: [],
      }),
      updateOn: [],
    })
  }

  private hooks() {
    return this.fb.group({
      onInit: [],
      onChanges: [],
      afterContentInit: [],
      afterViewInit: [],
      onDestroy: [],
    });
  }

  private wrappers() {
    return this.fb.array([
        this.fb.control(
          ''
        )
      ]
    )
  }

  private parsers() {
    return this.fb.array([
      this.fb.control('')
    ])
  }

  get fieldGroups() {
    return this.form.get('fieldGroup') as FormArray;
  }

  get wrapper() {
    return this.form.get('wrappers') as FormArray;
  }

  get validator() {
    return this.form.get('validators') as FormArray;
  }

  get asyncValidator() {
    return this.form.get('validators') as FormArray;
  }

  get parser() {
    return this.form.get('parsers') as FormArray;
  }

  addFieldGroups() {
    this.fieldGroups.push(this.fg());
  }

  addWrappers() {
    this.wrapper.push(this.fb.control(''));
  }

  addParsers() {
    this.parser.push(this.fb.control(''));
  }

  removeEmpty( field ) {
    Object.keys(field).forEach(key => {
      if (field[key] && typeof field[key] === 'object') {
        this.removeEmpty(
          field[key]);
      } else if (field[key] === null) {
        delete field[key];
      }
    });
    return field;
  };

  express(expr) {
    const b: Array<any> = Object.values(expr);
    const b0 = b[0];
    const b1 = b[1];
    let obj = {};
    obj[b0] = b1;
    this.removeEmpty(obj);

    // console.log({expressionProperties:{...obj}});
    return {...obj};
  }

  val(val) {
    const b: Array<any> = Object.values(val);
    console.log(b);
    const b0 = b[0];
    console.log(b0.key);
      const name = b0.key;
      delete b0.key;
      console.log(b0);
      let obj = {};
      obj[name] = b0;
      // delete obj.key;
      console.log(obj);
      return obj;
  }

  // TODO: Simplificar
  onSubmit() {
    this.controlName = this.form.get('controlName').value;
    this.firebasePath = this.form.get('firebasePath').value;
    let w = this.form.get('wrappers').value;
    console.log(w);
    // console.log(Object.values(w));
    let b = this.form.get('fieldGroup').value;
    let field = {};
    let expr = this.form.get('expressionProperties').value;
    let val = this.form.get('validators').value;
    let asyncVal = this.form.get('asyncValidators').value;



    this.form.value.expressionProperties = this.express(expr);
    this.form.value.validators = this.val(val);
    this.form.value.asyncValidators = this.val(asyncVal);

    field = { fieldConfig: { ...this.form.value } };
    this.removeEmpty(field);
    console.log(field);

    // TODO: Controlar los errores al guardar en firestore
    // this.afs.collection(`${ this.firebasePath }`).doc(this.controlName)
    //   .set(field);
  }


}
