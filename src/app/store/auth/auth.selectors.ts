import { Selector } from '@ngxs/store';
import { AuthState, AuthStateModel } from './auth.state';

export class AuthSelectors {

  @Selector([ AuthState ])
  static loggedInUser( state: AuthStateModel ) {
    return state.loggedInUser;
  }

  // @Selector([ AuthState ])
  // static role( state: AuthStateModel ) {
  //   return state.role;
  // }

  @Selector([ AuthState ])
  static loggedInUserName( state: AuthStateModel ) {
    return state.userName;
  }

}
