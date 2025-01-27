import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewordinaryformComponent } from './viewordinaryform.component';

describe('ViewordinaryformComponent', () => {
  let component: ViewordinaryformComponent;
  let fixture: ComponentFixture<ViewordinaryformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewordinaryformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewordinaryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
