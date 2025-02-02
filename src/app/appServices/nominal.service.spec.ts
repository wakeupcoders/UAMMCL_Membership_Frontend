import { TestBed } from '@angular/core/testing';

import { NominalService } from './nominal.service';

describe('NominalService', () => {
  let service: NominalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
