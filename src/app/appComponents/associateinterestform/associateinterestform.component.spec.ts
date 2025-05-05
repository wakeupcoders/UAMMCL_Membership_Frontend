import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateinterestformComponent } from './associateinterestform.component';

describe('AssociateinterestformComponent', () => {
  let component: AssociateinterestformComponent;
  let fixture: ComponentFixture<AssociateinterestformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateinterestformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociateinterestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
