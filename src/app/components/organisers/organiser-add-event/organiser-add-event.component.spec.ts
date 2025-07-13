import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserAddEventComponent } from './organiser-add-event.component';

describe('OrganiserAddEventComponent', () => {
  let component: OrganiserAddEventComponent;
  let fixture: ComponentFixture<OrganiserAddEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganiserAddEventComponent]
    });
    fixture = TestBed.createComponent(OrganiserAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
