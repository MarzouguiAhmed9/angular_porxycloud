import { TestBed } from '@angular/core/testing';

import { ServicesponsorsService } from './servicesponsors.service';

describe('ServicesponsorsService', () => {
  let service: ServicesponsorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesponsorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
