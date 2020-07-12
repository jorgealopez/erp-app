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

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

  animations: [onSideNavChange, onMainContentChange, animateLogo],
})
export class MenuComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService
  ) {
    this.sidenavService.sideNavState$.subscribe((res) => {
      console.log(res);
      this.onSideNavChange = res;
    });

    breakpointObserver
      .observe([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Medium])
      .subscribe((result) => {
        if (result.matches) {
          this.activateHandsetLayout();
        }
      });
  }

  public sideNavState = false;
  public linkText = false;
  public onSideNavChange: boolean;
  public pages: Page[] = ITEM_LIST;

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

  activateHandsetLayout() {
    console.log('large');
    this.sideNavState = this.sideNavState;
    this.sideNavState = !this.sideNavState;
    this.sidenavService.sideNavState$.next(this.sideNavState);
    this.linkText = this.sideNavState;
  }
}
