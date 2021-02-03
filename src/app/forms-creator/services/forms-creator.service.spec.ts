import { TestBed } from '@angular/core/testing';

import { FormsCreatorService } from './forms-creator.service';

describe('FormsCreatorService', () => {
  let service: FormsCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
