import { TestBed } from '@angular/core/testing';

import { LabSkeletonService } from './lab-skeleton.service';

describe('LabSkeletonService', () => {
  let service: LabSkeletonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabSkeletonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
