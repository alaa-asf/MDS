import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RTNINSTOREWAITLIAISONComponent } from './rtn-instore-waitliaison.component';

describe('RTNINSTOREWAITLIAISONComponent', () => {
  let component: RTNINSTOREWAITLIAISONComponent;
  let fixture: ComponentFixture<RTNINSTOREWAITLIAISONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RTNINSTOREWAITLIAISONComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RTNINSTOREWAITLIAISONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
