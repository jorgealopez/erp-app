import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SignupRequestInterface } from '../../types/signupRequest.interface';
import { Store } from '@ngrx/store';
import { signupAction } from '../../store/actions/signup.actions';

@Component({

  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  icon: string;
  titleLabel: string;
  usernameLabel: string;
  emailLabel: string;
  passwordLabel: string;
  usernameHint: string;
  emailHint: string;
  passwordHint: string;
  checkboxLabel: string;
  termsLabel: string;
  buttonLabel: string;
  alreadyAnAcountLabel: string;
  logInLinkLabel: string;
  loginIcon: string;

  // mat-error del formulario

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {

    this.initializeForm();
    this.initializeLabelsandHints();
    // this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      checkbox: ['', Validators.required],
    });
  }

  initializeLabelsandHints(): void {
    this.icon = 'arrow_back';
    this.titleLabel = 'Registro';
    this.usernameLabel = 'Usuario';
    this.usernameHint = 'Nombre(s) y apellidos';
    this.emailLabel = 'Email';
    this.emailHint = 'correo electrónico';
    this.passwordLabel = 'Password';
    this.passwordHint = `La contraseña debe contener al menos 6 caracteres.
      Incluye al menos una letra mayúscula y un número`;
    this.checkboxLabel = 'Acepto los';
    this.termsLabel = 'términos y condiciones';
    this.buttonLabel = 'Registrarse';
    this.alreadyAnAcountLabel = 'Ya tienes una cuenta';
    this.logInLinkLabel = 'Inicia Sesión';
    this.loginIcon = 'login';
  }

  initializeValues() {
    return;
  }

  onSubmit(): void {
    // console.log('submit', this.form.value, this.form.valid);
    // console.log(this.form.get('email').value);
    const request: SignupRequestInterface = {
      user: this.form.value,
    };

    this.store.dispatch(signupAction({ request }));
  }
}
