import { TestBed } from '@angular/core/testing';

import { IncomeOutcomeService } from './income-outcome.service';

describe('IncomeOutcomeService', () => {
  let service: IncomeOutcomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeOutcomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
