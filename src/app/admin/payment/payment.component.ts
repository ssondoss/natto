import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import { ApplicationStateService } from 'src/app/app.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css', '../../app.component.css'],
})
export class PaymentComponent implements OnInit {
  i = 0;
  payments: any;
  merchants: any;
  constructor(
    private http: HttpClient,
    private userSession: UserSessionService,
    public appService: ApplicationStateService
  ) {
    if (localStorage.getItem('bazzar-admin-user-jwt') == null) {
      userSession.logout();
    }
  }

  ngOnInit() {
    this.getAllCommissions();
    this.getAllMerchants();
  }

  getAllCommissions() {
    this.http
      .get(environment.apiURL + '/merchant-commission')
      .subscribe((data: any) => {
        // data.forEach((payment) => {
        // this.payments[this.i] = payment;
        this.payments = data;
        // this.i++;
        // });
      });
  }

  getOneCommissionByMerchantID(id) {
    this.http
      .get(environment.apiURL + '/merchant-commission/by-merchant-id/' + id)
      .subscribe((data: any) => {
        this.payments = data;
      });
  }

  payTake(id: string) {
    this.http
      .post(environment.apiURL + '/merchant-commission/pay/' + id, {})
      .subscribe((data) => {
        this.payments = this.payments.filter(
          (payment: any) => payment.id != id
        );
        this.payments.push(data);
      });
  }

  calculateCommission(orderCommissions: any) {
    let commissions = 0;
    orderCommissions.forEach((element) => {
      if (!element.paid) commissions += element.commission;
    });
    return commissions;
  }

  calculateTotalRevenue(orderCommissions: any) {
    let total = 0;
    orderCommissions.forEach((element) => {
      total += element.order.total;
    });
    return total;
  }

  getUnpaidCount(orderCommissions: any) {
    let count = 0;
    orderCommissions.forEach((element) => {
      if (!element.paid) count++;
    });
    return count;
  }

  getAllMerchants() {
    this.http
      .get(environment.apiURL + '/merchant/accepted/')
      .subscribe((data: any) => {
        this.merchants = data;
        console.log(this.merchants);
      });
  }

  filterMerchats(value) {
    if (value == 'all') {
      this.getAllCommissions();
    } else {
      this.getOneCommissionByMerchantID(value);
    }
  }
}
