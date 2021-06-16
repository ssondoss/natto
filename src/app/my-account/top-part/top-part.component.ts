import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';

@Component({
  selector: 'top-part',
  templateUrl: './top-part.component.html',
  styleUrls: ['./top-part.component.css', '../../app.component.css'],
})
export class TopPartComponent implements OnInit {
  username;
  constructor(private userSession: UserSessionService) {
    this.username = this.userSession.user.username;
  }

  ngOnInit(): void {}
}
