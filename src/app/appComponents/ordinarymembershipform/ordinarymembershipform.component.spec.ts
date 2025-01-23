import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinarymembershipformComponent } from './ordinarymembershipform.component';

describe('OrdinarymembershipformComponent', () => {
  let component: OrdinarymembershipformComponent;
  let fixture: ComponentFixture<OrdinarymembershipformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdinarymembershipformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdinarymembershipformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
