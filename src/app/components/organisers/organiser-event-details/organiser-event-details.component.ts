import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDTO } from 'src/app/models/DTO/event-dto.model';
import { UserDTO } from 'src/app/models/DTO/user-dto.model';
import { EventsService } from 'src/app/services/events.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-organiser-event-details',
  templateUrl: './organiser-event-details.component.html',
  styleUrls: ['./organiser-event-details.component.css'],
})
export class OrganiserEventDetailsComponent implements OnInit {
  getRoleByRoleId(roleId: number) {
    if (roleId == 1) {
      return 'Admin';
    }
    if (roleId == 2) {
      return 'Organizer';
    }
    if (roleId == 3) {
      return 'Participant';
    }
    return '';
  }
  private _activatedRoute = inject(ActivatedRoute);
  private _eventService = inject(EventsService);
  private _userService = inject(UserDetailsService);
  users: UserDTO[] = [];
  event!: EventDTO;
  ngOnInit(): void {
    this._userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
    this._activatedRoute.paramMap.subscribe((params) => {
      var para = params.get('eventId');
      if (para) {
        var eventId = +para;
        this._eventService.getEventById(eventId).subscribe((event) => {
          this.event = event;
          this._eventService.getParticipants(eventId).subscribe((userIds) => {
            this.users = this.users.filter((user) => {
              return userIds.includes(user.userId);
            });
          });
        });
      }
    });
  }
}
