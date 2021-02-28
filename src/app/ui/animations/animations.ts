import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

const a = '250ms ease-in';
const b = '237px';

// TODO Crear archivo de configuración de varialbles para los estilos

export const onSideNavChange = trigger('onSideNavChange', [
  state(
    'close',
    style({
      width: '60px',
    })
  ),
  state(
    'open',
    style({
      width: b,
    })
  ),
  state(
    'collapsed',
    style({
      width: '0px',
    })
  ),
  transition('open => close', animate(a)),
  transition('close => open', animate('250ms ease-out')),
]);

export const onMainContentChange = trigger('onMainContentChange', [
  state(
    'open',
    style({
      'margin-left': '237px',
    })
  ),
  state(
    'close',
    style({
      'margin-left': '60px',
    })
  ),
  state(
    'collapsed',
    style({
      'margin-left': '0px',
    })
  ),
  transition('open => close', animate('250ms ease-in')),
  transition('close => open', animate('250ms ease-out')),
]);

export const animateText = trigger('animateText', [
  state(
    'show',
    style({
      display: 'block',
      opacity: 1,
    })
  ),
  state(
    'hide',
    style({
      display: 'none',
      opacity: 0,
    })
  ),
  transition('open => close', animate('200ms ease-in')),
  transition('close => open', animate('350ms ease-out')),
]);

export const animateIcon = trigger('animateIcon', [
  state(
    'show',
    style({
      'font-size': '25px',
    })
  ),
  state(
    'hide',
    style({
      'font-size': '23px',
    })
  ),
  transition('open => close', animate('250ms ease-in')),
  transition('close => open', animate('250ms ease-out')),
]);

export const animateLogo = trigger('animateLogo', [
  state(
    'handset',
    style({
      'font-size': '40px',
    })
  ),
  state(
    'large',
    style({
      'font-size': '50px',
    })
  ),
  state(
    'open',
    style({
      color: '#4337c8',
      'text-shadow': '1px 0.9px 4px #4337c8',
    })
  ),
  state(
    'close',
    style({
      color: '#00b77b',
      'text-shadow': '1px 0.9px 4px #00b77b',
    })
  ),
  transition('handset => large', animate('250ms ease-in')),
  transition('large => handset', animate('250ms ease-out')),
  transition('open => close', animate('250ms ease-in')),
  transition('close => open', animate('250ms ease-out')),
]);

export const indicatorRotate = trigger('indicatorRotate', [
  state('collapsed', style({ transform: 'rotate(0deg)' })),
  state('expanded', style({ transform: 'rotate(180deg)' })),
  transition(
    'expanded <=> collapsed',
    animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
  ),
]);
