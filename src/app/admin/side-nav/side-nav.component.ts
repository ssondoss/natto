import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';

@Component({
  selector: 'admin-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class AdminSideNavComponent implements OnInit {
  constructor(public userSession: UserSessionService) {}

  ngOnInit(): void {}
}
