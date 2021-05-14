import { TestBed } from '@angular/core/testing';

import { VacunacionApiService } from './vacunacion-api.service';

describe('VacunacionApiService', () => {
  let service: VacunacionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunacionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
