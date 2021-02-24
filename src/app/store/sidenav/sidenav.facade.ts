import { Component, Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { EventBusService, Events } from '../../services/event-bus.service';
import { SidenavItemInterface } from '../../types/ui/sidenav-item.interface';
import { Sidenav } from './sidenav.actions';
import { SidenavSelectors } from './sidenav.selectors';

@Injectable({
  providedIn: 'root',
})

export class SidenavFacade {

  eventbusSub: Subscription;

  constructor(private eventbus: EventBusService) {
    this.eventbusSub = this.eventbus.on(Events.Login, (res => {
      alert(res);
      this.getSidenavItems('UI-configuration/sidenav/menu-items');
    }))
  }

  @Select(SidenavSelectors.sidenavItems)
  sidenavItems$: Observable<SidenavItemInterface[]>;

  @Dispatch()
  public getSidenavItems(collection: string) {
    return new Sidenav.GetSidenavItems(collection);
  }
}
