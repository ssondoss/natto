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
    this.http
      .get(environment.apiURL + '/order/' + this.currentPage)
      .subscribe((data: any) => {
        data.content.forEach((code) => {
          this.orders[this.i] = code;
          this.i++;
        });
        this.totalPages = data.totalPages;
        this.pagesNumber = Array(this.totalPages);
        for (let index = 1; index <= this.totalPages; index++) {
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
}
