import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  layout: String = 'row';
  width: String = '50%';
  padding: String = '4';
  show: Boolean = true;
  constructor(private media: ObservableMedia, public auth: AuthService) {
    media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'md' || change.mqAlias === 'lg') {
        this.layout = 'row';
        this.width = '50%';
        this.padding = '4';
      } else {
        this.layout = 'column';
        this.width = '100%';
        this.padding = '0';
      }
    });
   }

  ngOnInit() {
  }

}
