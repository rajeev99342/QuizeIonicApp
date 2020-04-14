import { TestBed } from '@angular/core/testing';

import { MesssageServicesService } from './messsage-services.service';

describe('MesssageServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MesssageServicesService = TestBed.get(MesssageServicesService);
    expect(service).toBeTruthy();
  });
});
