import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '../actionTypes';
import { SignupRequestInterface } from '../../types/signupRequest.interface';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

export const signupAction = createAction(
  ActionTypes.SIGNUP,
  props<{ request: SignupRequestInterface }>()
);

export const signupSuccessAction = createAction(
  ActionTypes.SIGNUP_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const signupFailureAction = createAction(
  ActionTypes.SIGNUP_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
