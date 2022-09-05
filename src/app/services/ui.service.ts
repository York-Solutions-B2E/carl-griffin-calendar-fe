import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {UserService} from "./user.service";
import {EventService} from "./event.service";
import {User} from "../User";
import {Event} from "../Event";

@Injectable({
  providedIn: 'root'
})
export class UIService {
  userSubject: Subject<User | null> = new Subject()
  user: User | null = null
  restOfUsersSubject: Subject<User[]> = new Subject()
  restOfUsers: User[] = []
  eventsSubject: Subject<Event[]> = new Subject()
  events: Event[] = []
  invitesSubject: Subject<Event[]> = new Subject()
  invites: Event[] = []

  constructor(private userService: UserService, private eventService: EventService) {
  }

  dummyUserUpdate() {
    this.userSubject.next(this.user)
  }

  dummyEventUpdate() {
    this.eventsSubject.next(this.events)
  }

  dummyInvitesUpdate() {
    this.invitesSubject.next(this.invites)
  }

  //User methods
  whenUserChanges(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  whenRestOfUsersChange(): Observable<User[]> {
    return this.restOfUsersSubject.asObservable();
  }

  getRestOfUsers() {
    if (this.user)
      if (this.user.id)
        this.userService
          .getUsers(this.user.id)
          .subscribe(users => this.restOfUsersSubject.next(users))
  }

  attemptLogin(user: User): void {
    this.userService.getUser(user).subscribe(user => {
      if (user) {
        this.user = user
        this.userSubject.next(user)
        this.refreshEvents();
      } else {
        this.userSubject.next(null)
      }
    })
  }

  attemptSignup(user: User): void {
    this.userService.createUser(user).subscribe(() => {
      this.attemptLogin(user);
    })
  }

  logout(): void {
    this.userSubject.next(null);
  }

  //Event methods
  whenEventsChange(): Observable<Event[]> {
    return this.eventsSubject.asObservable();
  }

  whenInvitesChange(): Observable<Event[]> {
    return this.invitesSubject.asObservable();
  }

  onAddEvent(event: Event): void {
    this.eventService.onCreateEvent(event).subscribe(() => {
      this.refreshEvents()
    })
  }

  onDeleteEvent(eventID: number): void {
    this.eventService.onDeleteEvent(eventID).subscribe(() => {
      this.refreshEvents()
    })
  }

  onEditEvent(event: Event): void {
    this.eventService.onEditEvent(event).subscribe(() => {
      this.refreshEvents()
    })
  }

  refreshEvents() {
    if (this.user) {
      if (this.user.id) {
        this.eventService.getInvites(this.user.id).subscribe(events =>{
          this.invites = events
          this.invitesSubject.next(events);
        })
        this.eventService.getEventsByUserId(this.user.id).subscribe(events => {
          if (events) {
            this.events = events;
            this.eventsSubject.next(events);
          }
        })
      }
    }
  }
}
