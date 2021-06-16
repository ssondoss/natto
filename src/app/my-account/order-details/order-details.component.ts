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
}
