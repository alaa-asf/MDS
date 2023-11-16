import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUpAgentComponent } from './pick-up-agent.component';

describe('PickUpAgentComponent', () => {
  let component: PickUpAgentComponent;
  let fixture: ComponentFixture<PickUpAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickUpAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickUpAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
