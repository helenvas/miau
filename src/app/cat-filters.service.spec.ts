import { TestBed } from '@angular/core/testing';

import { CatFiltersService } from './cat-filters.service';

describe('CatFiltersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatFiltersService = TestBed.get(CatFiltersService);
    expect(service).toBeTruthy();
  });
});
