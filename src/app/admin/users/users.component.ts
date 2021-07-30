import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../app.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = new Array();
  currentPage = 0;
  i = 0;
  totalPages: any;
  pagesNumber: any[];
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
    this.getPageOfUsers();
  }

  deleteUser(id: string, username: string) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will delete user ' + username + '!',
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

  blockUser(id: string, username: string) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will block user ' + username + '!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, block it!',
      })
      .then((result) => {
        if (result.value) {
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
      });
  }
  unblockUser(id: string, username: string) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will unblock user ' + username + '!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unblock it!',
      })
      .then((result) => {
        if (result.value) {
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
      });
  }

  changePage(page) {
    this.currentPage = page;
    this.getPageOfUsers();
  }
  getPageOfUsers() {
    this.i = 0;
    this.http
      .get(environment.apiURL + '/user/page-of-client/' + this.currentPage)
      .subscribe((data: any) => {
        data.content.forEach((code) => {
          this.users[this.i] = code;
          this.i++;
        });
        this.totalPages = data.totalPages;
        this.pagesNumber = Array(this.totalPages);
        for (let index = 1; index <= this.totalPages; index++) {
          this.pagesNumber[index - 1] = index;
        }
        // console.log(this.users);
      });
  }
}
