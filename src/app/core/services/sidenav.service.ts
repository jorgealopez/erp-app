import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSidenav} from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { SidenavItemInterface } from '../types/ui/sidenav-item.interface';

@Injectable()
export class SidenavService {
  // With this subject you can save the sidenav state and consumed later into
  // other pages.
  public sideNavState$: Subject<boolean> = new Subject();
  private sidenav: MatSidenav;

  constructor(private afs: AngularFirestore) {}

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle() {
    return this.sidenav.toggle();
  }

  getSidenavItems(collection: string): Observable<SidenavItemInterface[]> {
    return this.afs.collection<SidenavItemInterface>(collection)
      .valueChanges()
      .pipe(
        map(data => {
          // console.log(data);
          return Object.keys(data).map(k => data[k])
            .sort(( a, b ) => a.order - b.order)
          }
        ),
        // tap(console.log),
        shareReplay(1),
      );
  }
}
