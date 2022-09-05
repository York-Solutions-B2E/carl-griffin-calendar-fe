import {Component, OnInit} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {MatDialog} from '@angular/material/dialog';
import {AddEventComponent} from "../add-event/add-event.component";
import {UIService} from "../../services/ui.service";
import {Event} from "../../Event"

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar: boolean = true
  events: Event[] = []
  invites: Event[] = []
  selectedDates: DateRange<Date> | null = null;

  constructor(public dialog: MatDialog, private uiService: UIService) {
    uiService.whenInvitesChange().subscribe(events => {
      this.invites = events
    })
    uiService.whenEventsChange().subscribe(events => {
      this.events = events
    })
  }

  ngOnInit(): void {
    this.uiService.dummyEventUpdate()
  }

  onAddBtnClick(): void {
    this.dialog.open(AddEventComponent, {
      width: '350px'
    })
  }

  onSwitch() {
    this.calendar = !this.calendar;
  }

  onReset(): void {
    this.selectedDates = null;
    this.uiService.refreshEvents()
  }

  onDatesChange(date: Date): void {
    if (
      this.selectedDates &&
      this.selectedDates.start &&
      date > this.selectedDates.start &&
      !this.selectedDates.end
    ) {
      this.selectedDates = new DateRange(
        this.selectedDates.start,
        date
      );
      // @ts-ignore
      this.events.filter(event => {
        if (this.selectedDates)
          if (this.selectedDates.start)
            return event.date < date && event.date >= this.selectedDates.start;
      })
    } else {
      this.selectedDates = new DateRange(date, null);
      this.events = this.events.filter(event =>
        new Date(event.date).getTime() > new Date(new Date(date).setDate(date.getDate() - 1)).getTime() && new Date(event.date).getTime() < new Date(new Date(date).setDate(date.getDate() + 1)).getTime())
    }
  }

}
