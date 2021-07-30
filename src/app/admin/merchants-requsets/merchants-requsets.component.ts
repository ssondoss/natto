import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-merchants-requsets',
  templateUrl: './merchants-requsets.component.html',
  styleUrls: ['./merchants-requsets.component.css', '../../app.component.css'],
})
export class MerchantsRequsetsComponent implements OnInit {
  merchantRequests: any[] = new Array();
  i = 0;
  currentPage = 0;
  pagesNumber;
  totalPages;
  totalElements;
  constructor(
    private http: HttpClient,
    private userSession: UserSessionService
  ) {
    if (localStorage.getItem('bazzar-admin-user-jwt') == null) {
      userSession.logout();
    }
  }

  ngOnInit() {
    this.getPageOfRequests();
  }

  getPageOfRequests() {
    this.i = 0;
    this.http
      .get(environment.apiURL + '/merchant/not-accepted/' + this.currentPage)
      .subscribe((data: any) => {
        console.log(data);
        data.content.forEach((code) => {
          this.merchantRequests[this.i] = code;
          this.i++;
        });
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.pagesNumber = Array(this.totalPages);
        for (let index = 1; index <= this.totalPages; index++) {
          this.pagesNumber[index - 1] = index;
        }
      });
  }

  changePage(page) {
    this.currentPage = page;
    this.getPageOfRequests();
  }
  acceptMerchent(id: string) {
    this.http
      .put(environment.apiURL + '/merchant/approve-byMerchant/' + id, null)
      .subscribe((data: any) => {
        this.merchantRequests.forEach((request) => {
          if (request.id == id) {
            this.merchantRequests.splice(
              this.merchantRequests.indexOf(request),
              1
            );
            this.i--;
          }
        });
      });
  }
  deleteMerchent(id: string) {
    this.http
      .delete(environment.apiURL + '/merchant/' + id)
      .subscribe((data: any) => {
        this.merchantRequests.forEach((request) => {
          if (request.id == id) {
            this.merchantRequests.splice(
              this.merchantRequests.indexOf(request),
              1
            );
            this.i--;
          }
        });
      });
    console.log(this.merchantRequests);
  }
}
