import { TestBed } from '@angular/core/testing';

import { CardSummayService } from './card-summay.service';

describe('CardSummayService', () => {
  let service: CardSummayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardSummayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
