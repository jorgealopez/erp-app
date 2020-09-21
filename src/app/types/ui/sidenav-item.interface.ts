export interface SidenavItemInterface {
  parent?: string;
  name: string;
  icon?: string;
  expandIcon?: string;
  tooltip?: string;
  routerLink?: string;
  children?: SidenavItemInterface[];
}
