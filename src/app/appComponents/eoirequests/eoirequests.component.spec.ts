import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EOIRequestsComponent } from './eoirequests.component';

describe('EOIRequestsComponent', () => {
  let component: EOIRequestsComponent;
  let fixture: ComponentFixture<EOIRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EOIRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EOIRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
