import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SidenavService } from '../../services/sidenav.service';
import { SidenavItemInterface } from '../../types/ui/sidenav-item.interface';
import { Sidenav } from './sidenav.actions';
import GetSidenavItems = Sidenav.GetSidenavItems;

export class SidenavStateModel {
  sidenavItems: SidenavItemInterface[];
}

@State<SidenavStateModel>({
  name: 'sidenav',
  defaults: {
    sidenavItems: [],
  },
})

@Injectable()
export class SidenavState {

  constructor( private sidenavService: SidenavService ) {}

  @Action(GetSidenavItems)
  getSidenavItems(
    ctx: StateContext<SidenavStateModel>,
    action: GetSidenavItems,
  ) {
    const state = ctx.getState;
    return this.sidenavService.getSidenavItems(action.collection)
      .pipe(
        tap((result) => {
          result.forEach(x => {
            console.log(x);
          })
          console.log(`sidenav service ${result}`);
          ctx.setState({
            ...state,
            sidenavItems: result
          });
        }),
      );
  }
}
