import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  animateLogo,
  onMainContentChange,
  onSideNavChange,
} from '../animations/animations';
import { logoutAction } from '../auth/store/actions/signup.actions';
import { isLoggedInSelector } from '../auth/store/selectors';
import { SidenavService } from '../services/sidenav.service';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { SidenavItemInterface } from '../types/ui/sidenav-item.interface';
import { ThemeInterface } from '../types/ui/theme.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.scss' ],

  animations: [ onSideNavChange, onMainContentChange, animateLogo ],
})
export class MenuComponent implements OnInit {
  sideNavState = false;
  linkText = false;
  onSideNavChange: boolean;
  sidenavItems: Observable<SidenavItemInterface[]>;
  isLoggedIn$: Observable<boolean>;
  cTheme: string;
  @Output() theme: EventEmitter<string> = new EventEmitter<string>();

  themes: ThemeInterface[] = [
    { name: 'theme2-theme' },
    { name: 'space-cadet-dark-theme' },
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(( result ) => result.matches),
      shareReplay(),
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    private store: Store,
  ) {
    this.sidenavService.sideNavState$.subscribe(( res ) => {
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
      .subscribe(( result ) => {
        if (result.matches) {
          this.activateLargeLayout();
        }
      });
  }

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

  changeTheme( value: string ): void {
    this.cTheme = value;
    this.theme.emit(this.cTheme);
  }

  ngOnInit(): void {
    this.sidenavItems = this.sidenavService.getSidenavItems();
  }
}
