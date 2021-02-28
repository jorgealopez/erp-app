import { TestBed } from '@angular/core/testing';

import { DynamicFormResolver } from './dynamic-form.resolver';

describe('DynamicFormResolver', () => {
  let resolver: DynamicFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DynamicFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
