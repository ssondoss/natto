import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationStateService } from '../app.service';
import { AddAddressComponent } from './add-address/add-address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserSessionService } from '../user-session.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { OrderDetailsComponent } from './order-details/order-details.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css', '../app.component.css'],
})
export class MyAccountComponent implements OnInit {
  changeMobileForm: FormGroup;
  active = 0;
  email: string;
  user: User;
  mySuccessAlert = false;
  hasAddress: boolean;

  show() {
    this.active = 1;
  }
  unshow() {
    this.active = 0;
  }
  constructor(
    public dialog: MatDialog,
    config: NgbRatingConfig,
    public appService: ApplicationStateService,
    private userSession: UserSessionService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    config.max = 5;
    if (!userSession.isLoggedIn) userSession.logout();
    else {
      this.userSession.login();
      this.user = userSession.user;
      if (
        this.user.address.addressLineOne == 'NA' ||
        this.user.address.addressLineTwo == 'NA' ||
        this.user.address.city == 'NA' ||
        this.user.address.country == 'NA'
      ) {
        this.hasAddress = false;
      } else {
        this.hasAddress = true;
      }
    }
  }
  showSuccessAlert() {
    this.mySuccessAlert = true;
    setTimeout(() => {
      this.mySuccessAlert = false;
    }, 2000);
  }
  returnLanguage() {
    return this.appService.lang;
  }

  ngOnInit(): void {
    this.changeMobileForm = this.fb.group({
      phone: [
        this.user.phone,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          // prettier-ignore
          Validators.pattern("[0-9]*"),
        ]),
      ],
      email: [this.user.email],
      username: [this.user.username],
    });
  }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ChangeEmailComponent, {
  //     width: '610px',
  //     height: 'auto',
  //     maxWidth: '95%',
  //     data: {},
  //   });
  // }
  openDialogChangePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '610px',
      height: 'auto',
      maxWidth: '95%',

      data: {},
    });
  }

  updateUsernameAndMobile() {
    if (this.changeMobileForm.controls['phone'].valid) {
      let username = this.userSession.user.username;
      let phone = this.changeMobileForm.controls['phone'].value;

      this.http
        .post(
          environment.apiURL +
            '/user/update-user-mobile-number-and-username/' +
            this.user.id,
          {
            phone: phone,
            username: username,
          }
        )
        .subscribe((data: any) => {
          this.userSession.user.username = data.username;
          this.userSession.user.phone = data.phone;
          this.user.username = data.username;
          this.user.phone = data.phone;
          let token = JSON.parse(localStorage.getItem('bazzar-user-jwt'));
          token.payload.phone = this.userSession.user.phone;
          localStorage.removeItem('bazzar-user-jwt');

          localStorage.setItem('bazzar-user-jwt', JSON.stringify(token));
          this.showSuccessAlert();
        });
    } else {
      this.changeMobileForm.markAllAsTouched();
    }
  }
}
