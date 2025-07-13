import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRegisterEventComponent } from './participant-register-event.component';

describe('ParticipantRegisterEventComponent', () => {
  let component: ParticipantRegisterEventComponent;
  let fixture: ComponentFixture<ParticipantRegisterEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantRegisterEventComponent]
    });
    fixture = TestBed.createComponent(ParticipantRegisterEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
