import {Component, OnInit} from '@angular/core';
import {UIService} from "../../services/ui.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username = ''
  password = ''
  pending = false
  error: string | undefined;

  constructor(private uiService: UIService) {
    uiService.whenUserChanges().subscribe(value => {
      if(value === null){
        this.error = 'Wrong username or password.'
      } else {
        this.error = undefined;
      }
      this.pending = false
    })
  }

  ngOnInit(): void {
  }

  onLogin(event: { preventDefault: () => void }): void {
    event.preventDefault();
    this.pending = true
    this.uiService.attemptLogin({username: this.username, password: this.password})
  }

  onSignup(event: { preventDefault: () => void }): void {
    event.preventDefault();
    this.pending = true
    this.uiService.attemptSignup({username: this.username, password: this.password})
  }
}
