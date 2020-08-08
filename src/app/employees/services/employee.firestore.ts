import { Injectable } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFirestore extends FirestoreService<Employee> {
  protected basePath: string = 'employees';
}
