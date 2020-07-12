import { Component, HostBinding, Input } from '@angular/core';
import { Page } from 'src/app/@menu-item-list/item-list';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  animateText,
  animateIcon,
  indicatorRotate,
} from 'src/app/animations/animations';
// TODO Incluir las animaciones faltantes
@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [indicatorRotate, animateIcon, animateText],
})
export class MenuListItemComponent {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: Page;
  @Input() linktext: boolean;
  @Input() isHandset$: Observable<boolean>;
  parentRoute: string;
  // @HostBinding('class.Active') Active: boolean;

  constructor(public router: Router) {
    this.parentRoute = this.item?.parent;
  }

  onItemSelected(item: Page) {
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
      this.parentRoute = item.parent;
      console.log(this.parentRoute);
    }
    if (!item.children || !item.children.length) {
      this.parentRoute = item.parent;
      // this.Active = !this.Active;
      // console.log(item.parent);
      // console.log(this.parentRoute);
    }
  }

  isActive(): boolean {
    return this.router.isActive(
      this.router.createUrlTree([this.item.routerlink]).toString(),
      true
    );
  }
}
