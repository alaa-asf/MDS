import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTNWITHLIAISONAGENTComponent } from './rtn-withliaisonagent.component';

describe('RTNWITHLIAISONAGENTComponent', () => {
  let component: RTNWITHLIAISONAGENTComponent;
  let fixture: ComponentFixture<RTNWITHLIAISONAGENTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTNWITHLIAISONAGENTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RTNWITHLIAISONAGENTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
