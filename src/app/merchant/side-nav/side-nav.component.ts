import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';

@Component({
  selector: 'merchant-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css', '../../app.component.css'],
})
export class SideNavMerchantComponent implements OnInit {
  constructor(public userSession: UserSessionService) {}

  ngOnInit(): void {}
}
