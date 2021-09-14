import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationStateService } from 'src/app/app.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css', '../../app.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appService: ApplicationStateService
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  getOrderStatusEnglish(status: any) {
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

  getOrderStatusArabic(status: any) {
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
