import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationStateService } from 'src/app/app.service';
import { User } from 'src/app/models/user';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-saved-address',
  templateUrl: './saved-address.component.html',
  styleUrls: ['./saved-address.component.css', '../../app.component.css'],
})
export class SavedAddressComponent implements OnInit {
  user: User;
  hasAddress: boolean;
  addressForm: FormGroup;
  constructor(
    private userSession: UserSessionService,
    private router: Router,
    public appService: ApplicationStateService,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    config: NgbRatingConfig
  ) {
    if (!userSession.isLoggedIn) userSession.logout();
    else {
      this.user = userSession.user;
      if (
        this.user.address.addressLineOne == 'NA' ||
        this.user.address.addressLineTwo == 'NA' ||
        this.user.address.city == 'NA' ||
        this.user.address.country == 'NA'
      ) {
        this.hasAddress = false;
        this.addressForm = this.fb.group({
          phone: [this.user.phone],
          addressLineOne: [''],
          addressLineTwo: [''],

          city: [''],
          country: [''],
        });
      } else {
        this.hasAddress = true;
        this.addressForm = this.fb.group({
          phone: [this.user.phone],
          addressLineOne: [this.user.address.addressLineOne],
          addressLineTwo: [this.user.address.addressLineTwo],
          city: [this.user.address.city],
          country: [this.user.address.country],
        });
      }
    }
  }

  ngOnInit(): void {}

  openDialogAddAddress(): void {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: '600px',
      height: 'auto',
      maxWidth: '95%',
      maxHeight: '98%',
      data: { form: this.addressForm },
    });
    dialogRef.afterClosed().subscribe(async (data: any) => {
      if (data.event == 'ADDED') {
        this.addressForm = data.form;
        this.updateAddress(data.form);
      }
    });
  }

  updateAddress(form) {
    if (form.valid) {
      this.http
        .post(
          environment.apiURL + '/user/update-user-address/' + this.user.id,
          {
            addressLineOne: form.controls['addressLineOne'].value,
            addressLineTwo: form.controls['addressLineTwo'].value,
            city: form.controls['city'].value,
            country: form.controls['country'].value,
          }
        )
        .subscribe((data: any) => {
          this.userSession.user.address = data.deliveryAddress;
          this.user.address = data.deliveryAddress;

          this.http
            .post(
              environment.apiURL +
                '/user/update-user-mobile-number/' +
                this.user.id,
              this.addressForm.controls['phone'].value
            )
            .subscribe((data: any) => {
              this.addressForm.controls['phone'].setValue(data.phone);

              this.userSession.user.phone = data.phone;
              this.user.phone = data.phone;
            });
        });
    }
  }
}
