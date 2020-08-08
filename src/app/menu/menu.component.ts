import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  onSideNavChange,
  onMainContentChange,
  animateLogo,
} from '../animations/animations';
import { SidenavService } from '../services/sidenav.service';
import { Page, ITEM_LIST } from '../@menu-item-list/item-list';
import { AuthService } from '../auth/services/auth.service';
import { logoutAction } from '../auth/store/actions/signup.actions';

import { Store, select } from '@ngrx/store';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { isLoggedInSelector } from '../auth/store/selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

  animations: [onSideNavChange, onMainContentChange, animateLogo],
})
export class MenuComponent {
  sideNavState = false;
  linkText = false;
  onSideNavChange: boolean;
  pages: Page[] = ITEM_LIST;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    private store: Store
  ) {
    this.sidenavService.sideNavState$.subscribe((res) => {
      console.log(res);
      this.onSideNavChange = res;
    });

    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));

    breakpointObserver
      .observe([
        Breakpoints.XLarge,
        Breakpoints.Large,
        Breakpoints.Medium,
        Breakpoints.TabletLandscape,
      ])
      .subscribe((result) => {
        if (result.matches) {
          this.activateLargeLayout();
        }
      });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 2);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }

  activateLargeLayout() {
    console.log('large');
    this.sideNavState = this.sideNavState;
    this.sideNavState = !this.sideNavState;
    this.sidenavService.sideNavState$.next(this.sideNavState);
    this.linkText = this.sideNavState;
  }

  logout() {
    const currentUser: CurrentUserInterface = {
      email: null,
      uid: null,
    };
    this.store.dispatch(logoutAction());
    // this.authService.logout();
  }
}
