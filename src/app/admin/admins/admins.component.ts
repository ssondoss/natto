import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css', '../../app.component.css'],
})
export class AdminsComponent implements OnInit {
  users: any[] = new Array();
  i = 0;
  constructor(
    private http: HttpClient,
    private userSession: UserSessionService
  ) {
    if (localStorage.getItem('bazzar-admin-user-jwt') == null) {
      userSession.logout();
    }
  }

  ngOnInit() {
    this.http
      .get(environment.apiURL + '/user/admin/')
      .subscribe((data: any) => {
        data.forEach((code) => {
          this.users[this.i] = code;
          this.i++;
        });
        console.log(this.users);
      });
  }

  deleteUser(id: string) {
    this.http
      .delete(environment.apiURL + '/user/' + id)
      .subscribe((data: any) => {
        this.users.forEach((user) => {
          if (user.id == id) {
            this.users.splice(this.users.indexOf(user), 1);
            this.i--;
          }
        });
      });
    console.log(this.users);
  }

  blockUser(id: string) {
    this.http
      .put(environment.apiURL + '/user/block/' + id, null)
      .subscribe((data: any) => {
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index].id == data.id) {
            this.users[index] = data;
          }
        }
      });
  }
  unblockUser(id: string) {
    this.http
      .put(environment.apiURL + '/user/unBlock/' + id, null)
      .subscribe((data: any) => {
        for (let index = 0; index < this.users.length; index++) {
          if (this.users[index].id == data.id) {
            this.users[index] = data;
          }
        }
      });
  }
}
