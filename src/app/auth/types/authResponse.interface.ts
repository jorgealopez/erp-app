// import firebase from 'firebase/auth';
import firebase from 'firebase';
// import firebase from 'firebase/app';
// import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

export interface AuthResponseInterface {
  user: firebase.User;
}
