import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../Event'
import {UIService} from "../../services/ui.service";
import {ViewEventComponent} from "../view-event/view-event.component";
import {MatDialog} from "@angular/material/dialog";
import {AddEventComponent} from "../add-event/add-event.component";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() calendar:boolean = true;
  @Input() event: Event = {
    date: new Date(),
    invitees: [],
    note: "",
    title: "",
    userID: 0
  }

  constructor(public uiService: UIService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onClicked(){
    this.dialog.open(ViewEventComponent, {
      width: '250px',
      data: this.event
    })
  }

  onEditClicked() {
    this.dialog.open(AddEventComponent, {
      width: '350px',
      data: this.event,
    })
  }

  onAcceptInvite(){
    this.uiService
      .onEditEvent({...this.event, invitees: this.event.invitees
          .map(invitee =>
            invitee.userID === this.uiService.user?.id ? {...invitee, accepted: true} : invitee)})
  }

  onDeleteClicked() {
    if (this.event.id)
      this.uiService.onDeleteEvent(this.event.id)
  }

}
