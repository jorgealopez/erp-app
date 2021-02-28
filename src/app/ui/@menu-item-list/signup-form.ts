export interface Form {
  key?: string;
  value?: string;
  required?: boolean;
  controlType?: string;
  type?: string;
  order: number;
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
  loginLinkLabel: string;
  loginIcon: string;
  passwordError: string;
}

// TODO: Probar añadiendo enums a las propiedades de la interface.
