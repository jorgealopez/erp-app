import {createAction, props} from '@ngrx/store';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {SignupRequestInterface} from '../../types/signupRequest.interface';

import {ActionTypes} from '../actionTypes';

export const signupAction = createAction(
  ActionTypes.SIGNUP,
  props<{ request: SignupRequestInterface }>(),
);

export const signupSuccessAction = createAction(
  ActionTypes.SIGNUP_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>(),
);

export const signupFailureAction = createAction(
  ActionTypes.SIGNUP_FAILURE,
  props<{ errors: BackendErrorsInterface }>(),
);

export const logoutAction = createAction(ActionTypes.LOGOUT);
