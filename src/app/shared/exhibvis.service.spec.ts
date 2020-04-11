import { TestBed } from '@angular/core/testing';

import { ExhibvisService } from './exhibvis.service';

describe('ExhibvisService', () => {
  let service: ExhibvisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExhibvisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
