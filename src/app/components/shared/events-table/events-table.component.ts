import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventDTO } from 'src/app/models/DTO/event-dto.model';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
})
export class EventsTableComponent {
  @Input() events: Array<EventDTO> = [];
  @Input() isRegistered = false;
  @Input() action = 'Register';
  private _route = inject(Router);
  takeAction(event: EventDTO) {
    if (this.isRegistered === true) {
    } else {
      if (this.action === 'Details') {
        this._route.navigate([
          `/organizer/event-details/${event.eventId}`,
          // { eventId: event.eventId },
        ]);
      } else {
        this._route.navigate([
          `/participant/register-event/${event.eventId}`,
          // { eventId: event.eventId },
        ]);
      }
    }
  }
}
