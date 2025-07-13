import { Component, OnInit, inject } from '@angular/core';
import { EventDTO } from 'src/app/models/DTO/event-dto.model';
import { EventsService } from 'src/app/services/events.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-organiser-home',
  templateUrl: './organiser-home.component.html',
  styleUrls: ['./organiser-home.component.css'],
})
export class OrganiserHomeComponent implements OnInit {
  events: EventDTO[] = [];
  private _eventsService = inject(EventsService);
  private _user = inject(UserDetailsService).user;
  ngOnInit(): void {
    this._eventsService
      .getCreatedEvents(this._user.userId)
      .subscribe((val) => (this.events = val));
  }
}
