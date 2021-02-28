import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad, Route,
  Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthSelectors } from '../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor( private store: Store, private router: Router ) {}

  canLoad(
    route: Route,
    state: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.store.selectSnapshot(
      AuthSelectors.loggedInUser);
    if (isAuthenticated) {
      return true;
    }
    // this.router.createUrlTree([ 'auth/login' ]);
    this.router.navigate(['/auth/login']);
    return false;

  }

  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return undefined;
  // }

}
