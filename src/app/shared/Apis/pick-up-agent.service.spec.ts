import { TestBed } from '@angular/core/testing';

import { PickUpAgentService } from './pick-up-agent.service';

describe('PickUpAgentService', () => {
  let service: PickUpAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickUpAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
