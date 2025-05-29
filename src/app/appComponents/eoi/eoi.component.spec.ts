import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EOIComponent } from './eoi.component';

describe('EOIComponent', () => {
  let component: EOIComponent;
  let fixture: ComponentFixture<EOIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EOIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EOIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
