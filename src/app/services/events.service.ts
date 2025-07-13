import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { config } from 'src/environments/api';
import { EventDTO } from '../models/DTO/event-dto.model';
import { EventBSO } from '../models/BSO/event-bso.model';
// import { config } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private _http = inject(HttpClient);
  getallEvents() {
    return this._http.get<EventDTO[]>(config.baseUrlEvents);
  }
  getregisteredEventIds(userId: number) {
    let url = config.baseUrlRegistrations + 'user/' + `${userId}`;
    return this._http.get<Int32Array>(url);
  }
  getCreatedEvents(organizerId: number) {
    let url = config.baseUrlEvents + 'Organizer/' + `${organizerId}`;
    return this._http.get<EventDTO[]>(url);
  }
  getEventById(eventId: number) {
    return this._http.get<EventDTO>(config.baseUrlEvents + eventId);
  }
  createEvent(event: EventBSO) {
    let url = config.baseUrlEvents;
    return this._http.post<EventDTO>(url, event);
  }
  getParticipants(eventId: number) {
    let url = config.baseUrlRegistrations + 'event/' + eventId;
    return this._http.get<Int32Array>(url);
  }
}
