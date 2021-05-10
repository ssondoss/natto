import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'merchant-top-part',
  templateUrl: './top-part.component.html',
  styleUrls: ['./top-part.component.css', '../../app.component.css'],
})
export class TopPartMerchantComponent implements OnInit {
  merchant: any;
  isDataReady = false;
  constructor(
    public userSession: UserSessionService,
    private http: HttpClient
  ) {
    this.http
      .get(
        environment.apiURL + '/merchant/get-byOwner/' + this.userSession.user.id
      )
      .subscribe((res) => {
        this.merchant = res;
        console.log(this.merchant);
        this.isDataReady = true;
      });
  }

  ngOnInit(): void {}

  getLogoSrc(logo) {
    return environment.imageURL + logo;
  }
}
