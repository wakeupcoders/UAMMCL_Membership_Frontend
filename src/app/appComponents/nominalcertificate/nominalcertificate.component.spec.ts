import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalcertificateComponent } from './nominalcertificate.component';

describe('NominalcertificateComponent', () => {
  let component: NominalcertificateComponent;
  let fixture: ComponentFixture<NominalcertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominalcertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominalcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
