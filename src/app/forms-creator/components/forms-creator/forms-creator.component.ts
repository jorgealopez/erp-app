import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-forms-creator',
  templateUrl: './forms-creator.component.html',
  styleUrls: [ './forms-creator.component.scss' ],
})
export class FormsCreatorComponent implements OnInit {
  model = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
    },
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        required: true,
        type: 'text',
        label: 'First Name',
      },
    },
    {
      key: 'address',

      templateOptions: { label: 'Address' },
      fieldGroup: [ {
        key: 'town',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'Town',
        },
      } ],
    },
  ];
  // key:	string;	// The key that relates to the model. This will link the
  // // field value to the model.
  // id:	string;	// This allows you to specify the id of your field. Note,
  // the
  // // id is generated if not set.
  // name:	string; //	If you wish, you can specify a specific name for your
  // // field. This is useful if you're posting the form to a server using
  // techniques of yester-year. type:	string;	// The type of field to be
  // rendered. More information over at // Custom templates. component:	any;
  // //	Can be set to replace the component that is defined in // type.
  // className:	string;	// You can specify your own class that will be
  // applied // to the formly-field directive. templateOptions:	object;
  // //	This is reserved for the templates. Any // template-specific options
  // go in here. Look at your specific template implementation to know the
  // options required for this. template:	string; //	Can be set instead of
  // type to render custom html // content. defaultValue: any; //	If this is
  // provided and the value of the model at // compile-time is undefined, then
  // the value of the model will be assigned the defaultValue. hide:	boolean;
  // //	Whether to hide the field. Defaults to false. If you // wish this to
  // be conditional use hideExpression. hideExpression:	boolean | string |
  // function; //	Conditionally hide the // field based on values from other
  // fields. expressionProperties:	boolean| string | function; //	An object
  // where the // key is a property to be set on the main field config and the
  // value is an expression used to assign that property. focus:	boolean; //
  // Whether to focus or blur the element field. Defaults to // false. If you
  // wish this to be conditional use expressionProperties wrappers:	string[];
  // //	It is expected to be the name of the wrappers. The // formly field template will be wrapped by the first wrapper, then the second, then the third, etc. You can also specify these as part of a type (which is the recommended approach). parsers:	function[];	// Array of functions to execute, as a pipeline, // whenever the model updates, usually via user input. fieldGroup:	FormlyFieldConfig[]; //	A field group is a way to group fields // together, making advanced layout very simple. It can also be used to group fields that are associated with the same model (useful if it's different than the model for the rest of the fields). fieldArray:	FormlyFieldConfig; // fieldGroupClassName:	string; //	Specify your own class that will be // applied to the formly-group component. validation:	object; //	An object with a few useful properties: messages, show validators:	any; //	Used to set validation rules for a particular field. // Should be an object of key - value pairs. The value can either be an expression to evaluate or a function to run. Each should return a boolean value, returning true when the field is valid. See Validation for more information. asyncValidators:	any; //	Use this one for anything that needs to validate // asynchronously. Pretty much exactly the same as the validators api, except it must be a function that returns a promise. formControl:	AbstractControl; //	This is the FormControl for the field. // It provides you more control like running validators, calculating status, and resetting state. modelOptions:	object; //	An object with a few useful properties to // control the model changes: debounce, updateOn

  form: FormGroup;
  path: string = 'datos';
  controlName: string;
  firebasePath: string;

  constructor( private fb: FormBuilder, private afs: AngularFirestore ) { }

  ngOnInit(): void {
    this.initializeForm();
    // this.firebasePath = this.form.get('firebasePath').value;
  }

  initializeForm(): void {
    this.form = this.fb.group({
      firebasePath: [''],
      controlName: [ 'default' ],
      key: [ '', Validators.required ],
      type: [ '' ],
      className: [ '' ],
      gridColumn: [ '' ],
      gridRow: [ '' ],
      templateOptions: this.fb.group({
        label: [ '' ],
        placeholder: [ '' ],
        disabled: [ '' ],
        required: [ '' ],
      }),
    });
  }

  onSubmit() {
    this.controlName = this.form.get('controlName').value;
    this.firebasePath = this.form.get('firebasePath').value;
    this.afs.collection(`${this.firebasePath}`).doc(this.controlName).set(this.form.value);
  }

}
