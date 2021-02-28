import { AuthName } from '../../core/auth/auth-processor.interface';
import { CurrentUserInterface } from '../../core/types/currentUser.interface';
import { LoginRequestInterface } from '../../ui/auth/types/loginRequest.interface';
import { SignupRequestInterface } from '../../ui/auth/types/signupRequest.interface';

export namespace Auth {

  export class Signup {
    static readonly type = '[Auth] Signup';

    constructor( public newUser: SignupRequestInterface ) {}
  }

  export class Login {
    static readonly type = '[Auth] LoginWithEmailAndPassword';

    constructor(
      public authUser: LoginRequestInterface,
      public authName: AuthName ) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }

  export class GetRole {
    static readonly type = '[Auth] GetRole';

    constructor( public id: string ) {}
  }

  export class LoginSuccess {
    static readonly type = '[Auth] Login Success';

    constructor( public user: CurrentUserInterface ) {}
  }
}
