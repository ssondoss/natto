import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    private router: Router,
    private userSession: UserSessionService
  ) {
    if (userSession.isLoggedIn == false) userSession.logout();
    else if (userSession.user.role != 'ADMIN') router.navigate(['/']);
    // if (localStorage.getItem('bazzar-admin-user-jwt') == null) {
    //   userSession.logout();
    // }
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
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will delete admin account !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.value) {
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
        }
      });
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
