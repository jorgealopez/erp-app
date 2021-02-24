import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {Select, Store} from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  animateLogo,
  onMainContentChange,
  onSideNavChange,
} from '../animations/animations';

import { SidenavService } from '../services/sidenav.service';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { AuthFacade } from '../store/auth/auth.facade';
import { AuthSelectors } from '../store/auth/auth.selectors';
import { SidenavFacade } from '../store/sidenav/sidenav.facade';
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
  sidenavItems$: Observable<SidenavItemInterface[]>;
  // @Select(AuthSelectors.loggedInUser)
  isLoggedIn$: Observable<CurrentUserInterface>;
  user: any;
  userName: string;

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
    private authFacade: AuthFacade,
    private sidenavFacade: SidenavFacade,
    private router: Router
  ) {
    this.sidenavService.sideNavState$.subscribe(( res ) => {
      console.log(res);
      this.onSideNavChange = res;
    });

    // this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isLoggedIn$ = this.authFacade.isLoggedIn$;
    this.sidenavItems$ = this.sidenavFacade.sidenavItems$;
    this.user = this.isLoggedIn$.subscribe(a => {this.userName = a?.email});


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
    this.authFacade.logout();
    // this.authService.logout();
  }

  changeTheme( value: string ): void {
    this.cTheme = value;
    this.theme.emit(this.cTheme);
  }

  ngOnInit(): void {
    // this.sidenavItems = this.sidenavService.getSidenavItems();
    console.log(this.sidenavItems$);
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  signup() {
    this.router.navigate(['/auth/signup']);
  }
}
