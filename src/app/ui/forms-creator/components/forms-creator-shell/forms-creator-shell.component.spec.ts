import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsCreatorShellComponent } from './forms-creator-shell.component';

describe('FormsCreatorShellComponent', () => {
  let component: FormsCreatorShellComponent;
  let fixture: ComponentFixture<FormsCreatorShellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsCreatorShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCreatorShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
