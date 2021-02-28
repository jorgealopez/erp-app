import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { EmployeeFirestore } from './employee.firestore';
import { EmployeesPageStore } from './employees-page.store';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {

  constructor(
    private firestore: EmployeeFirestore,
    private store: EmployeesPageStore,
  ) {
    this.firestore.collection$().pipe(
      tap(employees => {
        this.store.patch({
          loading: false,
          employees,
          totalEmployees: employees.length,
        }, `employees collection subscription`);
      }),
    ).subscribe();
  }

  get employees$(): Observable<Employee[]> {
    return this.store.state$.pipe(
      map(state => state.loading ? [] : state.employees));
  }

  get filter$() {
    return this.store.state$.pipe(map(state => state.filter));
  }

  get filteredEmployees$(): Observable<Employee[]> {
    // noinspection JSDeprecatedSymbols
    return combineLatest(
      this.employees$,
      this.filter$,
    ).pipe(
      map(([ employees, filter ]) => {
        return employees.filter(employee => {
          return employee.name === filter.name;
        });
      }),
    );
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.loading));
  }

  get noResults$(): Observable<boolean> {
    return this.store.state$.pipe(
      map(state => {
        return !state.loading && state.employees && state.employees.length === 0;
      }),
    );
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formStatus));
  }
  // Declarative Pattern form Retrieving Data?
  // formStatus$ = this.store.state$.pipe(map(state => state.formStatus));

  get totalEmployees$(): Observable<number> {
    return this.store.state$.pipe(map(state => state.totalEmployees));
  }

  // get totalDrivers$(): Observable<number> {
  //   return this.store.state$.pipe(map(state => state.totalDrivers))
  // }

  // get totalRosarioEmployees$(): Observable<number> {
  //   return this.store.state$.pipe(map(state => state.totalRosarioEmployees))
  // }

  create(employee: Employee) {
    this.store.patch({ loading: true, employees: [], formStatus: 'Saving...' },
      'employee create');
    return this.firestore.create(employee).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, 'employee create SUCCESS');
      setTimeout(() => this.store.patch({ formStatus: '' },
        'employee create timeout reset formStatus'), 2000);
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' },
        'employee create ERROR');
    });
  }

  delete(id: string): any {
    this.store.patch({ loading: true, employees: [] }, 'employee delete');
    return this.firestore.delete(id).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' },
        'employee delete ERROR');
    });
  }
}
