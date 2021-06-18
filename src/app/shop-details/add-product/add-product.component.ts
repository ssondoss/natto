import { Component, OnInit, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationStateService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css', '../../app.component.css'],
})
export class AddProduct implements OnInit {
  product: any;
  counter = 1;
  service: any;
  constructor(
    public dialogRef: MatDialogRef<AddProduct>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appService: ApplicationStateService
  ) {
    this.service = appService.lang;
  }

  addAddressForm: FormGroup;
  onNoClick(): void {
    this.dialogRef.close({ event: 'CANCELED' });
  }

  addToCart() {
    this.dialogRef.close({ event: 'ADDED', count: this.counter });
  }

  increment() {
    this.counter++;
  }

  decrement() {
    if (this.counter > 1) this.counter--;
  }

  ngOnInit(): void {
    this.product = this.data;
  }

  getSource(image): string {
    return environment.imageURL + image;
  }
}
