import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsListComponent } from './forms-list.component';

describe('FormsListComponent', () => {
  let component: FormsListComponent;
  let fixture: ComponentFixture<FormsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
