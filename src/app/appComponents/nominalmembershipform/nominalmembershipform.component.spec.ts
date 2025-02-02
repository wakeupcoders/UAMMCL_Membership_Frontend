import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalmembershipformComponent } from './nominalmembershipform.component';

describe('NominalmembershipformComponent', () => {
  let component: NominalmembershipformComponent;
  let fixture: ComponentFixture<NominalmembershipformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominalmembershipformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominalmembershipformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
