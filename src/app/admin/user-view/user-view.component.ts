import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css', '../../app.component.css'],
})
export class UserViewComponent implements OnInit {
  user: any;
  userID: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userSession: UserSessionService
  ) {
    if (localStorage.getItem('bazzar-admin-user-jwt') == null) {
      userSession.logout();
    }
    this.route.queryParams.subscribe((params) => {
      this.userID = params['id'];
    });
  }

  ngOnInit() {
    this.http
      .get(environment.apiURL + '/user/' + this.userID)
      .subscribe((data: any) => {
        this.user = data;
      });
  }
}
