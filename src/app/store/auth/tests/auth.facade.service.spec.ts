import { TestBed } from '@angular/core/testing';

import { AuthStoreFacade } from '../auth-store.facade';

describe('AuthService', () => {
  let service: AuthStoreFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStoreFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
