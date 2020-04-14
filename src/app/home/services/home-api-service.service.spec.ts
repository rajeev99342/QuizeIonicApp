import { TestBed } from '@angular/core/testing';

import { HomeApiServiceService } from './home-api-service.service';

describe('HomeApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeApiServiceService = TestBed.get(HomeApiServiceService);
    expect(service).toBeTruthy();
  });
});
