import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';

@Component( {
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: [ './employees-form.component.scss' ],
} )
export class EmployeesFormComponent implements OnInit {
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

  // form: FormGroup = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   location: new FormControl('', Validators.required),
  //   hasDriverLicense: new FormControl(false),
  // });

  // locations = [
  //   'Rosario',
  //   'Buenos Aires',
  //   'Bariloche',
  // ];

  status$: Observable<string>;

  constructor(
    private employees: EmployeesService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.initializeLabelsAndHints();

    this.status$ = this.employees.formStatus$;
  }

  initializeForm(): void {
    this.form = this.fb.group( {
      // id: [ '', Validators.required ],
      name: [ '', Validators.required ],
    } );
  }

  initializeLabelsAndHints(): void {
    this.icon = 'arrow_back';
    this.titleLabel = 'Empleado';
    this.usernameLabel = 'Nombre';
    this.usernameHint = 'Nombre(s) y apellidos';
    this.emailLabel = 'Id';
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

  isInvalid( name ) {
    return this.form.controls[name].invalid &&
      ( this.form.controls[name].dirty || this.form.controls[name].touched );
  }

  async onSubmit() {
    this.form.disable();
    await this.employees.create( { ...this.form.value } );
    this.form.reset();
    this.form.enable();
  }

}
