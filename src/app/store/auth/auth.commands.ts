// import { StateContext } from '@ngxs/store';
// import { patch } from '@ngxs/store/operators';
// import { tap } from 'rxjs/operators';
// import { AuthService } from '../../services/auth.service';
// import { Auth } from './auth.actions';
// import { AuthStateModel } from './auth.state';
// import Signup = Auth.Signup;

// export const signup =
//   ( authService: AuthService ) => (
//     ctx: StateContext<AuthStateModel>,
//     action: Signup ) => {
//     authService.signup(action.newUser).subscribe(user => {
        // console.log(`Ngxs signup ${ user.email }`);
        // const state = ctx.getState();
        // console.log(state);
        // ctx.patchState({
        //     loggedInUser: user,
        //     userName: 'Nuevo'
        //   }
        // );
        // const b = ctx.getState();
        // console.log(b);
  //     },
  //   );
  // };

