import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatomSpinnerComponent } from './datom-spinner.component';

describe('DatomSpinnerComponent', () => {
  let component: DatomSpinnerComponent;
  let fixture: ComponentFixture<DatomSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatomSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatomSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
