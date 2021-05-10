import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-merchant',
  templateUrl: './edit-merchant.component.html',
  styleUrls: ['./edit-merchant.component.css', '../../app.component.css'],
})
export class EditMerchantComponent implements OnInit {
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

  updateMerchant() {
    let descriptionArabic = (document.getElementById(
      'descriptionArabic'
    ) as HTMLInputElement).value.trim();
    let descriptionEnglish = (document.getElementById(
      'descriptionEnglish'
    ) as HTMLInputElement).value.trim();
    let contact_info1 = (document.getElementById(
      'contact-info1'
    ) as HTMLInputElement).value.trim();
    let contact_info2 = (document.getElementById(
      'contact-info2'
    ) as HTMLInputElement).value.trim();

    this.http
      .put(environment.apiURL + '/merchant/' + this.merchantID, {
        accepted: true,
        blocked: true,
        contactInfo: contact_info1,
        descriptionArabic: descriptionArabic,
        descriptionEnglish: descriptionEnglish,
        logo: this.merchant.logo,
        merchantOwner: this.merchant.merchantOwner,
        merchantStatus: this.merchant.merchantStatus,
        tag: this.merchant.tag.id,
        titleArabic: this.merchant.titleArabic,
        titleEnglish: this.merchant.titleEnglish,
      })
      .subscribe((data: any) => {
        this.http
          .post(
            environment.apiURL +
              '/user/update-user-mobile-number/' +
              this.merchant.merchantOwner,
            { contact_info2 }
          )
          .subscribe((data: any) => {
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Updated!',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      });
  }
}
