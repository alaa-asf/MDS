import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintManifestComponent } from './print-manifest.component';

describe('PrintManifestComponent', () => {
  let component: PrintManifestComponent;
  let fixture: ComponentFixture<PrintManifestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintManifestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
