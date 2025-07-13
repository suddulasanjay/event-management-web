import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserEventDetailsComponent } from './organiser-event-details.component';

describe('OrganiserEventDetailsComponent', () => {
  let component: OrganiserEventDetailsComponent;
  let fixture: ComponentFixture<OrganiserEventDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganiserEventDetailsComponent]
    });
    fixture = TestBed.createComponent(OrganiserEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
