import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnominalformComponent } from './viewnominalform.component';

describe('ViewnominalformComponent', () => {
  let component: ViewnominalformComponent;
  let fixture: ComponentFixture<ViewnominalformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewnominalformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewnominalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
