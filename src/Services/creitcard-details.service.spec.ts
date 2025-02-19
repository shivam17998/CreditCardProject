import { TestBed } from '@angular/core/testing';

import { CreitcardDetailsService } from './creitcard-details.service';

describe('CreitcardDetailsService', () => {
  let service: CreitcardDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreitcardDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
