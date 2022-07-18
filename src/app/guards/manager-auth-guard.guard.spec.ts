import { TestBed } from '@angular/core/testing';

import { ManagerAuthGuardGuard } from './manager-auth-guard.guard';

describe('ManagerAuthGuardGuard', () => {
  let guard: ManagerAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagerAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
