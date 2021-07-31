import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css', '../../app.component.css'],
})
export class AllOrdersComponent implements OnInit {
  orders: any[] = new Array();
  i = 0;
  currentPage = 0;
  totalPages;
  pagesNumber: any[];
  filtredOrder: any[] = new Array();
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
    this.getPageOfOrders();
  }

  getPageOfOrders() {
    this.i = 0;
    this.http.get(environment.apiURL + '/order').subscribe((data: any) => {
      data.forEach((code) => {
        this.orders[this.i] = code;
        this.filtredOrder[this.i] = code;
        this.i++;
      });
      this.totalPages = 1;
      this.pagesNumber = Array(1);
      for (let index = 1; index <= 1; index++) {
        this.pagesNumber[index - 1] = index;
      }
    });
  }

  getNextPage() {}

  getPreviusPage() {}

  changePage(page) {
    this.currentPage = page;
    this.getPageOfOrders();
  }
  search(startDate: any, endDate: any, status: any, merchant: any) {
    this.filtredOrder = this.orders;
    if (startDate != '') {
      this.filterStartDate(startDate);
    }

    if (endDate != '') {
      this.filterEndDate(endDate);
    }
    if (status != '') {
      this.filterStatus(status);
    }
    if (merchant != '') {
      this.filterMerchant(merchant);
    }
  }

  filterStartDate(startDate) {
    console.log(startDate);
    this.filtredOrder = this.filtredOrder.filter((order: any) => {
      order.dateAndTime >= startDate;
    });
  }
  filterEndDate(endDate) {
    console.log(endDate);
    this.filtredOrder = this.filtredOrder.filter((order: any) => {
      order.dateAndTime <= endDate;
    });
  }
  filterStatus(status) {
    console.log(status);
    let a: any = new Array();
    for (const order of this.filtredOrder) {
      if (order.orderStatus == status) {
        a.push(order);
      }
    }
    this.filtredOrder = a;
  }
  filterMerchant(merchant) {
    console.log(merchant);
    this.filtredOrder = this.filtredOrder.filter((order: any) => {
      order.merchant.id == merchant;
    });
  }
}
