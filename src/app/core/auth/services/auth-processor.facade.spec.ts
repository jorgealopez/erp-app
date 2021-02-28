import { TestBed } from '@angular/core/testing';

import { AuthProcessorFacade } from './auth-processor.facade';

describe('AuthFacadeService', () => {
  let service: AuthProcessorFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthProcessorFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
