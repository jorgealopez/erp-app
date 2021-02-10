import { LoginRequestInterface } from '../../auth/types/loginRequest.interface';

export namespace Auth {

  export class LoginWithEmailAndPassword {
    static readonly type = '[Auth] LoginWithEmailAndPassword';
    constructor( public authUser: LoginRequestInterface ) {}
  }

  export class GetRole {
    static readonly type = '[Auth] GetRole';
    constructor(public id: string) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }
}
