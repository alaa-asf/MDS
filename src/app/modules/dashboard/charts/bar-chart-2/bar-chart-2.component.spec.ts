/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarChart2Component } from './bar-chart-2.component';

describe('BarChart2Component', () => {
  let component: BarChart2Component;
  let fixture: ComponentFixture<BarChart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
