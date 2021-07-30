import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-merchants',
  templateUrl: './all-merchants.component.html',
  styleUrls: ['./all-merchants.component.css', '../../app.component.css'],
})
export class AllMerchantsComponent implements OnInit {
  i = 0;
  merchants: any[] = new Array();
  currentPage = 0;
  pagesNumber;
  totalPages;
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
    this.getPageOfMerchants();
  }

  getPageOfMerchants() {
    this.i = 0;
    this.http
      .get(environment.apiURL + '/merchant/accepted/' + this.currentPage)
      .subscribe((data: any) => {
        data.content.forEach((merchant) => {
          this.merchants[this.i] = merchant;
          this.i++;
        });
        this.totalPages = data.totalPages;
        this.pagesNumber = Array(this.totalPages);
        for (let index = 1; index <= this.totalPages; index++) {
          this.pagesNumber[index - 1] = index;
        }
      });
  }

  acceptMerchent(id: string) {
    this.http
      .put(environment.apiURL + 'merchant/approve-byMerchant/' + id, null)
      .subscribe((data: any) => {
        this.merchants.forEach((merchant) => {
          if (merchant.id == id) {
            this.merchants.splice(this.merchants.indexOf(merchant), 1);
            this.i--;
          }
        });
      });
    console.log(this.merchants);
  }
  deleteMerchent(id: string, username: string) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will delete merchant ' + username + '!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.value) {
          this.http
            .delete(environment.apiURL + '/merchant/' + id)
            .subscribe((data: any) => {
              this.merchants.forEach((request) => {
                if (request.id == id) {
                  this.merchants.splice(this.merchants.indexOf(request), 1);
                  this.i--;
                }
              });
            });
        }
      });
    console.log(this.merchants);
  }

  blockMerchant(id: string, username: string) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will block merchant ' + username + '!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, block it!',
      })
      .then((result) => {
        if (result.value) {
          this.http
            .post(
              environment.apiURL + '/merchant/block-merchant-by-id/' + id,
              null
            )
            .subscribe((data: any) => {
              for (let index = 0; index < this.merchants.length; index++) {
                if (this.merchants[index].id == data.id) {
                  this.merchants[index] = data;
                }
              }
            });
        }
      });
  }
  unblockMerchant(id: string, username: string) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will unblock merchant ' + username + '!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, unblock it!',
      })
      .then((result) => {
        if (result.value) {
          this.http
            .post(
              environment.apiURL + '/merchant/unblock-merchant-by-id/' + id,
              null
            )
            .subscribe((data: any) => {
              for (let index = 0; index < this.merchants.length; index++) {
                if (this.merchants[index].id == data.id) {
                  this.merchants[index] = data;
                }
              }
            });
        }
      });
  }
  changePage(page) {
    this.currentPage = page;
    this.getPageOfMerchants();
  }
}
