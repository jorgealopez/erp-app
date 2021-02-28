import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Form } from '../../../@menu-item-list/signup-form';
import { FormsService } from '../../../../core/services/forms.firestore';
import { AuthStoreFacade } from '../../../../store/auth/auth-store.facade';
import { SignupRequestInterface } from '../../types/signupRequest.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  items: Observable<Form>;
  appearance: string = 'outline';
  protected basePath: string = 'formsLabelsAndHints';
  protected id: string = 'signupForm';

  constructor(
    private fb: FormBuilder,
    private ffs: FormsService<Form>,
    private authFacade: AuthStoreFacade,
  ) {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.initializeForm();
    this.items = this.ffs.doc$(this.basePath, this.id);
  }

  initializeForm(): void {
    // this.form = this.fb.group({
    //   username: [ '', Validators.required ],
    //   email: [ '', [Validators.required, Validators.email] ],
    //   password: [ '', [Validators.required, Validators.minLength(6)]],
    //   checkbox: [ '', Validators.required ],
    // });
    this.form = this.ffs.initializeForm();
  }

  onSubmit(): void {
    const request: SignupRequestInterface = {
      user: this.form.value,
    };

    this.authFacade.signup(request);
    // this.store.dispatch(signupAction({ request }));
  }

  getErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return typeof this.password.invalid ? 'Not a valid email' : '';
  }
}

// console.log('submit', this.form.value, this.form.valid);
// console.log(this.form.get('email').value);
