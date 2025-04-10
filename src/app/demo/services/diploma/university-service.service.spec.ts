import { TestBed } from '@angular/core/testing';

import { UniversityServiceService } from './university-service.service';

describe('UniversityServiceService', () => {
  let service: UniversityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
