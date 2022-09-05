import { Component } from '@angular/core';
import {UIService} from "./services/ui.service";
import {User} from "./User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User | null = null
  constructor(private uiService: UIService) {
    uiService.whenUserChanges().subscribe(user => this.user = user)
  }
}
