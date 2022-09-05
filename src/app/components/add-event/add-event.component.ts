import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Event} from '../../Event'
import {UIService} from "../../services/ui.service";
import {User} from "../../User";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  disableDropdown = true;
  addMode: boolean = true;
  date: Date = new Date;
  title: string = '';
  note: string = '';
  invitees: User[] = [];
  restOfUsers: User[] = [];


  constructor(public dialogRef: MatDialogRef<AddEventComponent>,
              private uiService: UIService,
              @Inject(MAT_DIALOG_DATA) public data: Event | undefined) {
    uiService.whenRestOfUsersChange().subscribe(users => {
      this.restOfUsers = users;
      this.disableDropdown = false;
    })
    if (!data) {
      this.addMode = true
    } else if (this.data) {
      this.date = this.data.date
      this.title = this.data.title
      this.note = this.data.note
      // @ts-ignore
      this.invitees = this.data.invitees.map(user => this.restOfUsers.find(x => x.id === user.userID))
      this.addMode = false
    }
  }

  ngOnInit(): void {
    this.uiService.getRestOfUsers()
  }

  onAdd() {
    if (this.uiService.user)
      if (this.uiService.user.id)
        this.uiService.onAddEvent({
          date: this.date,
          invitees: this.invitees.map(invitee => {
            return {
              userID: invitee.id,
              accepted: false
            }
          }),
          note: this.note,
          title: this.title,
          userID: this.uiService.user.id
        })
    this.dialogRef.close();
  }

  onEdit() {
    console.log(this.invitees)
    if (this.uiService.user)
      if (this.uiService.user.id)
        this.uiService.onEditEvent({
          id: this.data?.id,
          date: this.date,
          invitees: this.invitees.map(invitee => {
            return {
              userID: invitee.id,
              accepted: false
            }
          }),
          note: this.note,
          title: this.title,
          userID: this.uiService.user.id
        })
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
