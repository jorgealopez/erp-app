import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from '../../../../constants/auth.constants';
import { AuthName } from '../../../../core/auth/auth-processor.interface';
import { AuthStoreFacade } from '../../../../store/auth/auth-store.facade';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
})
export class LoginComponent implements OnInit {
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
  alreadyAnAccountLabel: string;
  logInLinkLabel: string;
  loginIcon: string;

  form: FormGroup;
  protected readonly authName: AuthName = auth;

  constructor( private fb: FormBuilder, private authFacade: AuthStoreFacade ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeLabelsAndHints();
    // this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: [ '', Validators.required ],
      email: [ '', Validators.required ],
      password: [ '', Validators.required ],
      checkbox: [ '', Validators.required ],
    });
  }

  initializeLabelsAndHints(): void {
    this.icon = 'arrow_back';
    this.titleLabel = 'Login';
    this.usernameLabel = 'Usuario';
    this.usernameHint = 'Nombre(s) y apellidos';
    this.emailLabel = 'Email';
    this.emailHint = 'correo electrónico';
    this.passwordLabel = 'Password';

    this.checkboxLabel = 'Acepto los';
    this.termsLabel = 'términos y condiciones';
    this.buttonLabel = 'Login';
    this.alreadyAnAccountLabel = 'No tienes una cuenta';
    this.logInLinkLabel = 'Regístrate';
    this.loginIcon = 'login';
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    };

    this.authFacade.login(request, this.authName);
  }
}
