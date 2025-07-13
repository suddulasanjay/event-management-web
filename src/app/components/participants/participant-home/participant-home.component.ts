import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnInit, inject } from '@angular/core';
import { EventDTO } from 'src/app/models/DTO/event-dto.model';
import { EventsService } from 'src/app/services/events.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { config } from 'src/environments/api';

@Component({
  selector: 'app-participant-home',
  templateUrl: './participant-home.component.html',
  styleUrls: ['./participant-home.component.css'],
})
export class ParticipantHomeComponent implements OnInit {
  registeredEvents: EventDTO[] = [];
  upcomingEvents: EventDTO[] = [];
  allEvents: EventDTO[] = [];
  private _http = inject(HttpClient);
  private _eventService = inject(EventsService);
  _user = inject(UserDetailsService).user;
  ngOnInit(): void {
    this._eventService.getallEvents().subscribe((events) => {
      this.allEvents = events;
      this._eventService
        .getregisteredEventIds(this._user.userId)
        .subscribe((eventIds) => {
          this.registeredEvents = [];
          this.upcomingEvents = [];
          this.allEvents.forEach((event) => {
            if (event.isPublished) {
              if (eventIds.includes(event.eventId)) {
                this.registeredEvents.push(event);
              } else {
                this.upcomingEvents.push(event);
              }
            }
          });
        });
    });
  }
}
