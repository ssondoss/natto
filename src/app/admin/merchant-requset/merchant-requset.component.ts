import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/user-session.service';

@Component({
  selector: 'app-merchant-requset',
  templateUrl: './merchant-requset.component.html',
  styleUrls: ['./merchant-requset.component.css', '../../app.component.css'],
})
export class MerchantRequsetComponent implements OnInit {
  constructor(private userSession: UserSessionService, private router: Router) {
    if (userSession.isLoggedIn == false) userSession.logout();
    else if (userSession.user.role != 'ADMIN') router.navigate(['/']);
  }

  ngOnInit(): void {}
}
