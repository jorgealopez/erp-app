import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  animateIcon,
  animateText,
  indicatorRotate,
} from 'src/app/animations/animations';
import { LoginRequestInterface } from '../../auth/types/loginRequest.interface';
import { AuthFacade } from '../../store/auth/auth.facade';
import { SidenavItemInterface } from '../../types/ui/sidenav-item.interface';
import { CurrentUserInterface } from '../types/currentUser.interface';

// TODO Incluir las animaciones faltantes
@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: [ './menu-list-item.component.scss' ],
  animations: [ indicatorRotate, animateIcon, animateText ],
})
export class MenuListItemComponent implements OnInit{
  expanded: boolean;
  // @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: SidenavItemInterface;
  @Input() linkText: boolean;
  @Input() isHandset$: Observable<boolean>;
  parentRoute: string;
  isLoggedIn$: Observable<CurrentUserInterface>

  // @HostBinding('class.Active') Active: boolean;

  constructor( public router: Router, private authFacade: AuthFacade ) {
    this.parentRoute = this.item?.parent;

  }

  ngOnInit() {
    this.isLoggedIn$ = this.authFacade.isLoggedIn$;
  }

  onItemSelected( item: SidenavItemInterface ) {
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
      this.parentRoute = item.parent;
      console.log(this.parentRoute);
    }
    if (!item.children || !item.children.length) {
      this.parentRoute = item.parent;
      // this.Active = !this.Active;
      console.log(item);
      this.router.navigateByUrl(item.routerLink).then(a => console.log(a));
      // console.log(this.parentRoute);
      // console.log('navegación realizada')
    }
  }

  isActive(): boolean {
    return this.router.isActive(
      this.router.createUrlTree([ this.item.routerLink ]).toString(),
      true,
    );
  }
}
