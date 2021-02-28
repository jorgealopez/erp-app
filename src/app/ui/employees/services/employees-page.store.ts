import { Injectable } from '@angular/core';
import { StoreService } from '../../../core/services/store.service';
import { EmployeesPage } from '../states/employees-page';

@Injectable({
  providedIn: 'root',
})
export class EmployeesPageStore extends StoreService<EmployeesPage> {
  protected store: string = 'employees-page';

  constructor() {
    super({
      loading: true,
      employees: [],
      totalEmployees: 0,
      timeStamp: null
    });
  }
}
