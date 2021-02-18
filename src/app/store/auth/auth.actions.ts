import { LoginRequestInterface } from '../../auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../../auth/types/signupRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

export namespace Auth {

  export class Signup {
    static readonly type = '[Auth] Signup';
    constructor( public newUser: SignupRequestInterface) {}
  }

  export class LoginWithEmailAndPassword {
    static readonly type = '[Auth] LoginWithEmailAndPassword';
    constructor( public authUser: LoginRequestInterface ) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }

  export class GetRole {
    static readonly type = '[Auth] GetRole';
    constructor(public id: string) {}
  }

    export class LoginSuccess {
    static readonly type = '[Auth] Login Success';
    constructor(public user: CurrentUserInterface) {}
    }
}
