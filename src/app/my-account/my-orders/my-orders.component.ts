import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/app.service';
import { UserSessionService } from 'src/app/user-session.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { RateOrderComponent } from '../rate-order/rate-order.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css', '../../app.component.css'],
})
export class MyOrdersComponent implements OnInit {
  user: User;
  orders: any;
  constructor(
    public appService: ApplicationStateService,
    private userSession: UserSessionService,
    private router: Router,
    public dialog: MatDialog,

    private http: HttpClient,
    private fb: FormBuilder
  ) {
    if (!userSession.isLoggedIn) userSession.logout();
    else {
      this.user = userSession.user;
    }
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.http
      .get(environment.apiURL + '/order/get-order-by-client-id/' + this.user.id)
      .subscribe((data: any) => {
        this.orders = data;
      });
  }
  getSource(image): string {
    return environment.imageURL + image;
  }

  openDialogOrderDetails(order: any): void {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      width: '700px',
      height: 'auto',
      maxWidth: '98%',

      data: { order: order },
    });
  }

  openDialogRateOrder(order: any) {
    const dialogRef = this.dialog.open(RateOrderComponent, {
      width: '400px',
      height: 'auto',
      maxWidth: '98%',

      data: { order: order },
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data.event == 'DONE') {
        if (this.appService.lang == 'en')
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Changed successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        else
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تم بنجاح',
            showConfirmButton: false,
            timer: 1500,
          });
      } else if (data.event == 'ALREADY_RATED') {
        if (this.appService.lang == 'en')
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'this order already rated',
            showConfirmButton: false,
            timer: 1500,
          });
        else
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'هذا الطلب تم تقييمه بالفعل',
            showConfirmButton: false,
            timer: 1500,
          });
      }
    });
  }
  mySuccessAlert = false;
  showSuccessAlert() {
    this.mySuccessAlert = true;
    setTimeout(() => {
      this.mySuccessAlert = false;
    }, 2000);
  }

  myDangerAlert = false;
  showDangerAlert() {
    this.myDangerAlert = true;
    setTimeout(() => {
      this.myDangerAlert = false;
    }, 2000);
  }

  deleteOrder(order) {
    this.http.delete(environment.apiURL + '/order/' + order.id).subscribe(
      (res) => {
        if (this.appService.lang == 'en')
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Order cancled ',
            showConfirmButton: false,
            timer: 2000,
          });
        else
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'تم الغاء الطلب ',
            showConfirmButton: false,
            timer: 2000,
          });
        this.getAllOrders();
      },
      (err) => {}
    );
  }
  getOrderStatusEnglish(status) {
    switch (status) {
      case 'PENDING':
        return 'Pending';
        break;
      case 'PROCCESSING':
        return 'Prossessing';
        break;
      case 'SHIPPED':
        return 'Shipped';
        break;
      case 'DELIVERED':
        return 'Delivered';
        break;
      case 'CANCELED_BY_MERCHANT':
        return 'Canceled by merchant';
        break;
      case 'CANCELED_BY_ADMIN':
        return 'Canceled by admin';
        break;

      default:
        return status;
        break;
    }
  }
  getOrderStatusArabic(status) {
    switch (status) {
      case 'PENDING':
        return 'قيد الانتظار';
        break;
      case 'PROCCESSING':
        return 'قيد التحضير';
        break;
      case 'SHIPPED':
        return 'قيد التوصيل';
        break;
      case 'DELIVERED':
        return 'تم الاستلام';
        break;
      case 'CANCELED_BY_MERCHANT':
        return 'الغاء من طرف المتجر';
        break;
      case 'CANCELED_BY_ADMIN':
        return 'الغاء من طرف المدير';
        break;

      default:
        return status;
        break;
    }
  }
}
