import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userAuthguardGuard } from './user-authguard.guard';

describe('userAuthguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userAuthguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
