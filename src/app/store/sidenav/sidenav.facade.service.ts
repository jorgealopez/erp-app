import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { EventBusService, Events } from '../../core/services/event-bus.service';
import { SidenavItemInterface } from '../../core/types/ui/sidenav-item.interface';
import { Sidenav } from './sidenav.actions';
import { SidenavSelectors } from './sidenav.selectors';

@Injectable({
  providedIn: 'root',
})

export class SidenavFacadeService {

  eventbusSub: Subscription;
  @Select(SidenavSelectors.sidenavItems)
  sidenavItems$: Observable<SidenavItemInterface[]>;

  constructor( private eventbus: EventBusService ) {
    this.eventbusSub = this.eventbus.on(Events.Login, (res => {
      alert(res);
      this.getSidenavItems('UI-configuration/sidenav/menu-items');
    }));
  }

  @Dispatch()
  public getSidenavItems( collection: string ) {
    return new Sidenav.GetSidenavItems(collection);
  }
}
