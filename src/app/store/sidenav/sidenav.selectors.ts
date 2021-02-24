import { Selector } from '@ngxs/store';
import { SidenavState, SidenavStateModel } from './sidenav.state';

export class SidenavSelectors {

  @Selector([SidenavState])
    static sidenavItems(state: SidenavStateModel) {
      return state.sidenavItems;
  }
}
