/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarChart1Component } from './bar-chart-1.component';

describe('BarChart1Component', () => {
  let component: BarChart1Component;
  let fixture: ComponentFixture<BarChart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
