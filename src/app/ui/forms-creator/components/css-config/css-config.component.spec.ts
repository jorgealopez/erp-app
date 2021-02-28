import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CssConfigComponent } from './css-config.component';

describe('CssConfigComponent', () => {
  let component: CssConfigComponent;
  let fixture: ComponentFixture<CssConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CssConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
