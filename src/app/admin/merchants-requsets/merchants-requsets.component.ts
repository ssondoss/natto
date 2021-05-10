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
      .get(environment.apiURL + '/merchant/not-accepted/')
      .subscribe((data: any) => {
        data.forEach((code) => {
          this.merchantRequests[this.i] = code;
          this.i++;
        });
        console.log(this.merchantRequests);
      });
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
