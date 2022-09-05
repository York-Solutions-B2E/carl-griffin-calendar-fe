import {Component, OnInit} from '@angular/core';
import {User} from "../../User";
import {UIService} from "../../services/ui.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username = ''

  constructor(private uiService: UIService) {
    uiService.whenUserChanges().subscribe(user => {
      if (user)
        this.username = user.username;
    })
  }

  ngOnInit(): void {
    this.uiService.dummyUserUpdate()
  }

  logout() {
    this.uiService.logout()
  }

}
