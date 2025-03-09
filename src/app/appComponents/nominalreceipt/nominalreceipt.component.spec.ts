import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalreceiptComponent } from './nominalreceipt.component';

describe('NominalreceiptComponent', () => {
  let component: NominalreceiptComponent;
  let fixture: ComponentFixture<NominalreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominalreceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominalreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
