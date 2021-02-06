import { style } from './style';

export interface cssGrid extends style {
  display?: style;
  gridTemplateRows?: style;
  gridTemplateColumns?: style;
  gridTemplateAreas?: style;
  gridTemplate?: style;
  gridColumnGap?: style;
  gridRowGap?: style;
  gridGap?: style;
  justifyItems?: style;
  alignItems?: style;
  placeItems?: style;
  justifyContent?: style;
  alignContent?: style;
  placeContent?: style;
  gridAutoColumns?: style;
  gridAutoRows?: style;
  gridAutoFlow?: style;
  grid?: style;
}
