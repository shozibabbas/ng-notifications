import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationGeneratorComponent } from './notification-generator.component';

describe('NotificationGeneratorComponent', () => {
  let component: NotificationGeneratorComponent;
  let fixture: ComponentFixture<NotificationGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
