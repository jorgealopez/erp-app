import { Employee } from '../models/employee';

export interface EmployeesPage {
  loading: boolean;
  employees: Employee[];
  formStatus: string;
  timeStamp: Date;
  filter?: {
    name: string
  };

  totalEmployees: number;
}
