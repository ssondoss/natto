import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../../app.component.css'],
})
export class OrdersComponent implements OnInit {
  show = [0, 0];
  merchant: any;
  orders: any = new Array();
  selectedOrderProducts: any;
  showOrderProducts = false;
  showenOrderId: any;
  showItems(order: any) {
    this.showenOrderId = order.id;
    this.selectedOrderProducts = order.products;
    this.showOrderProducts = true;
  }
  unshowItems(id) {
    this.showenOrderId = null;
    this.showOrderProducts = false;
  }

  constructor(
    private http: HttpClient,
    private userSession: UserSessionService,
    private translate: TranslateService
  ) {
    if (!userSession.isLoggedIn) {
      userSession.logout();
    } else {
      this.http
        .get(
          environment.apiURL + '/merchant/get-byOwner/' + userSession.user.id
        )
        .subscribe((res) => {
          this.merchant = res;

          http
            .get(
              environment.apiURL +
                '/order/get-orders-by-merchant-id/' +
                this.merchant.id
            )
            .subscribe((orders: any) => {
              this.orders = orders;
            });
        });
    }
  }

  ngOnInit(): void {}

  changeOrderStatus(status, id) {
    let httpParams = new HttpParams().append('status', status);
    this.http
      .post(environment.apiURL + '/order/change-order-status/' + id, httpParams)
      .subscribe(
        (data: any) => {
          this.http
            .get(
              environment.apiURL +
                '/order/get-orders-by-merchant-id/' +
                this.merchant.id
            )
            .subscribe((orders: any) => {
              this.orders = orders;
            });
          if (this.translate.currentLang == 'en')
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Updated!',
              showConfirmButton: false,
              timer: 1500,
            });
          else
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'تم تحديث الحالة',
              showConfirmButton: false,
              timer: 1500,
            });
        },
        (error) => {
          if (this.translate.currentLang == 'en')
            swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Something went wrong please try again!',
              showConfirmButton: false,
              timer: 1500,
            });
          else
            swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'حصل خطأ ما يرجى المحاولة مرة اخرى',
              showConfirmButton: false,
              timer: 1500,
            });
        }
      );
  }
}
