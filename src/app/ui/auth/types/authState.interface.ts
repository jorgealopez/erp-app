import { CurrentUserInterface } from '../../../core/types/currentUser.interface';
import { BackendErrorsInterface } from '../../../core/types/backendErrors.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null;
  isLoggedIn: boolean | null;
  validationErrors: BackendErrorsInterface | null;
  isLoading: boolean;
}
