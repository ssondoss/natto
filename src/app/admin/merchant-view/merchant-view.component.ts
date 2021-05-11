import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-merchant-view',
  templateUrl: './merchant-view.component.html',
  styleUrls: ['./merchant-view.component.css', '../../app.component.css'],
})
export class MerchantViewComponent implements OnInit {
  merchantID: string;
  merchant: any;
  merchantOrdersCount = 0;
  merchantRevenue = 0;
  merchantOwner: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userSession: UserSessionService
  ) {
    if (localStorage.getItem('bazzar-admin-user-jwt') == null) {
      userSession.logout();
    }

    this.route.queryParams.subscribe((params) => {
      this.merchantID = params['id'];
    });
  }

  ngOnInit(): void {
    this.http
      .get(environment.apiURL + '/merchant/get-byMerchant/' + this.merchantID)
      .subscribe((data: any) => {
        this.merchant = data;
        this.http
          .get(environment.apiURL + '/user/' + data.merchantOwner)
          .subscribe((user: any) => {
            this.merchantOwner = user;
          });
      });

    this.http
      .get(
        environment.apiURL +
          '/order/get-total-price-for-merchant/' +
          this.merchantID
      )
      .subscribe((data: any) => {
        this.merchantRevenue = data;
      });

    this.http
      .get(
        environment.apiURL +
          '/order/get-orders-by-merchant-id/' +
          this.merchantID
      )
      .subscribe((data: any) => {
        this.merchantOrdersCount = data.length;
      });
  }

  getSource(image): string {
    return 'http://164.68.99.181' + '/images/' + image;
  }
}
