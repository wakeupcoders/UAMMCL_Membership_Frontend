import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinaryreceiptComponent } from './ordinaryreceipt.component';

describe('OrdinaryreceiptComponent', () => {
  let component: OrdinaryreceiptComponent;
  let fixture: ComponentFixture<OrdinaryreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdinaryreceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdinaryreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
