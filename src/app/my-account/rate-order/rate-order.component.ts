import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationStateService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rate-order',
  templateUrl: './rate-order.component.html',
  styleUrls: ['./rate-order.component.css', '../../app.component.css'],
})
export class RateOrderComponent implements OnInit {
  currentRate = 0;
  constructor(
    public dialogRef: MatDialogRef<RateOrderComponent>,
    public formBuilder: FormBuilder,
    public http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appService: ApplicationStateService
  ) {
    console.log(data);
  }
  rateOrderForm: FormGroup;
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
  setRate() {
    console.log(this.currentRate);
  }
  rate() {
    let comment = (document.getElementById('comment') as HTMLInputElement)
      .value;
    this.http
      .post(environment.apiURL + '/merchant-rating', {
        comment: comment,
        merchantID: this.data.order.merchant.id,
        orderID: this.data.order.id,
        rate: this.currentRate,
        userID: this.data.order.user.id,
      })
      .subscribe(
        (data: any) => {
          this.dialogRef.close({ event: 'DONE' });
        },
        (error: any) => {
          this.dialogRef.close({ event: 'ALREADY_RATED' });
        }
      );
  }
}
