import { TestBed } from '@angular/core/testing';

import { StudyplanServiceService } from './studyplan-service.service';

describe('StudyplanServiceService', () => {
  let service: StudyplanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyplanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
