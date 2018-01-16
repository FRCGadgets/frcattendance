import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(auth: AuthService) {
    auth.signup('torth212@gmail.com', '1234567', '25');
  }
}
