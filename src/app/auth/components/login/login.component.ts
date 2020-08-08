import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms'
import {Store} from '@ngrx/store'
import {LoginRequestInterface} from '../../types/loginRequest.interface'
import {loginAction} from '../../store/actions/login.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  icon: string
  titleLabel: string
  usernameLabel: string
  emailLabel: string
  passwordLabel: string
  usernameHint: string
  emailHint: string
  passwordHint: string
  checkboxLabel: string
  termsLabel: string
  buttonLabel: string
  alreadyAnAcountLabel: string
  logInLinkLabel: string
  loginIcon: string

  form: FormGroup

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeLabelsandHints()
    // this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      checkbox: ['', Validators.required],
    })
  }

  initializeLabelsandHints(): void {
    this.icon = 'arrow_back'
    this.titleLabel = 'Login'
    this.usernameLabel = 'Usuario'
    this.usernameHint = 'Nombre(s) y apellidos'
    this.emailLabel = 'Email'
    this.emailHint = 'correo electrónico'
    this.passwordLabel = 'Password'

    this.checkboxLabel = 'Acepto los'
    this.termsLabel = 'términos y condiciones'
    this.buttonLabel = 'Login'
    this.alreadyAnAcountLabel = 'No tienes una cuenta'
    this.logInLinkLabel = 'Regístrate'
    this.loginIcon = 'login'
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    }

    this.store.dispatch(loginAction({request}))
  }
}
