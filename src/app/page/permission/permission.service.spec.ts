import { TestBed, inject } from '@angular/core/testing';

import { PermissionService } from './permission.service';

describe('PermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionService]
    });
  });

  it('should ...', inject([PermissionService], (service: PermissionService) => {
    expect(service).toBeTruthy();
  }));
});
