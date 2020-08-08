import {Injectable} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Subject} from 'rxjs';

@Injectable()
export class SidenavService {
  // With this subject you can save the sidenav state and consumed later into
  // other pages.
  public sideNavState$: Subject<boolean> = new Subject();
  private sidenav: MatSidenav;

  constructor() {
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle() {
    return this.sidenav.toggle();
  }
}
