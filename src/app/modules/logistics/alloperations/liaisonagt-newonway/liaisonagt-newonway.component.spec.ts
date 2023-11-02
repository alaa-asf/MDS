import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LIAISONAGTNEWONWAYComponent } from './liaisonagt-newonway.component';

describe('LIAISONAGTNEWONWAYComponent', () => {
  let component: LIAISONAGTNEWONWAYComponent;
  let fixture: ComponentFixture<LIAISONAGTNEWONWAYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LIAISONAGTNEWONWAYComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LIAISONAGTNEWONWAYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
