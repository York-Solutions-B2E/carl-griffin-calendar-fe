import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Event} from "../../Event";
import {User} from "../../User";
import {UIService} from "../../services/ui.service";

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
  invitedUsers: User[] = []

  constructor(public dialogRef: MatDialogRef<ViewEventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Event, public uiService: UIService) {
  }

  ngOnInit(): void {

  }

  onClose(): void {
    this.dialogRef.close()
  }
}
