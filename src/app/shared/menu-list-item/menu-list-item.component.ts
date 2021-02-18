import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  animateText,
  animateIcon,
  indicatorRotate,
} from 'src/app/animations/animations';
import { SidenavItemInterface } from '../../types/ui/sidenav-item.interface';
// TODO Incluir las animaciones faltantes
@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [indicatorRotate, animateIcon, animateText],
})
export class MenuListItemComponent {
  expanded: boolean;
  // @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: SidenavItemInterface;
  @Input() linkText: boolean;
  @Input() isHandset$: Observable<boolean>;
  parentRoute: string;
  // @HostBinding('class.Active') Active: boolean;

  constructor(public router: Router) {
    this.parentRoute = this.item?.parent;
  }

  onItemSelected(item: SidenavItemInterface) {
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
      this.router.createUrlTree([this.item.routerLink]).toString(),
      true
    );
  }
}
