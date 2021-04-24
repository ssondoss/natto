import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  show = [0, 0];
  merchant: any;
  orders: any;
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
    private userSession: UserSessionService
  ) {}

  ngOnInit(): void {
    this.http
      .get(
        environment.apiURL +
          '/order/get-orders-by-merchant-id/' +
          this.merchant.id
      )
      .subscribe((orders: any) => {
        this.orders = orders;
      });
  }
  changeOrderStatus(status, id) {}
}
