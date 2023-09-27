import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlloperationsComponent } from './alloperations.component';

describe('AlloperationsComponent', () => {
  let component: AlloperationsComponent;
  let fixture: ComponentFixture<AlloperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlloperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlloperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
