import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AdminAuthGuard } from './admin-authgard.guard';

describe('adminAuthgardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminAuthgardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
