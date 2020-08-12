export interface Page {
  parent?: string;
  name: string;
  icon?: string;
  expandIcon?: string;
  tooltip: string;
  routerlink?: string;
  children?: Page[];
}

export const ITEM_LIST: Page[] = [
  {
    name: 'Auth',
    icon: 'contacts',
    tooltip: 'Auth',
    expandIcon: 'expand_more',
    parent: './',
    children: [
      {
        name: '1.1 Login',
        tooltip: 'login',
        routerlink: './login',
        parent: 'Inbox',
      },
      {
        name: '1.2 Signup',
        tooltip: 'signup',
        routerlink: './signup',
      },
    ],
  },
  {
    name: 'Políticas',
    icon: 'policy',
    tooltip: 'Políticas',
    expandIcon: 'expand_more',
    parent: './',
    children: [
      {
        name: '2.1 Inbo',
        tooltip: 'tooltip',
        routerlink: './home',
      },
      {
        name: '2.2 Inbo',
        tooltip: 'tooltip',
        routerlink: './home',
      },
    ],
  },
  {
    name: 'Resultados',
    parent: 'some-parent',
    icon: 'poll',
    tooltip: 'Resultados',
    routerlink: './materiales',
  },
  {
    name: 'Contactos',
    parent: 'some-parent',
    icon: 'folder_shared',
    tooltip: 'employees',
    routerlink: './employees',
  },
  {
    name: 'Starred',
    parent: 'some-parent',
    icon: 'keyboard',
    tooltip: 'mensaje',
    routerlink: './home',
  },
  {
    name: 'Send email',
    parent: 'some-parent',
    icon: 'send',
    tooltip: 'mensaje',
  },
  {
    name: 'Entregas',
    parent: 'some-parent',
    icon: 'local_shipping',
    tooltip: 'mensaje',
  },
  {
    name: 'Sucursales',
    parent: 'some-parent',
    icon: 'storefront',
    tooltip: 'mensaje',
  },
  {
    name: 'Send email',
    parent: 'some-parent',
    icon: 'send',
    tooltip: 'mensaje',
  },
  {
    name: 'Inbox',
    parent: 'some-parent',
    icon: 'inbox',
    tooltip: 'mensaje',
  },
  {
    name: 'Starred',
    parent: 'some-parent',
    icon: 'star',
    tooltip: 'mensaje',
  },
  {
    name: 'Send email',
    parent: 'some-parent',
    icon: 'send',
    tooltip: 'mensaje',
  },
  {
    name: 'Inbox',
    parent: 'some-parent',
    icon: 'inbox',
    tooltip: 'mensaje',
  },
  {
    name: 'Starred',
    parent: 'some-parent',
    icon: 'star',
    tooltip: 'mensaje',
  },
];
