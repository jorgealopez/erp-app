import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCreatorComponent } from './forms-creator.component';

describe('FormsCreatorComponent', () => {
  let component: FormsCreatorComponent;
  let fixture: ComponentFixture<FormsCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
