import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Event} from '../Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {
  }

  getEventsByUserId(userID: number): Observable<Event[]> {
    return this.http.get<Event[]>(`http://localhost:5000/events`)
      .pipe(map(events =>
        events.filter(event =>
          (event.userID === userID || event.invitees.some(x =>
            (x.userID === userID && x.accepted === true))))))
  }

  onCreateEvent(event: Event): Observable<undefined> {
    return this.http.post<undefined>(`http://localhost:5000/events`, event)
  }

  onDeleteEvent(eventID: number): Observable<undefined> {
    return this.http.delete<undefined>(`http://localhost:5000/events/${eventID}`)
  }

  onEditEvent(event: Event): Observable<undefined> {
    return this.http.put<undefined>(`http://localhost:5000/events/${event.id}`, event)
  }

  getInvites(userID: number): Observable<Event[]> {
    return this.http
      .get<Event[]>(`http://localhost:5000/events`)
      .pipe(map(events =>
        events.filter(event =>
          event.invitees.some(x => x.userID === userID && x.accepted === false))))
  }
}
