import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeesFormComponent } from './employees-form.component';

describe('EmployeesFormComponent', () => {
  let component: EmployeesFormComponent;
  let fixture: ComponentFixture<EmployeesFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
