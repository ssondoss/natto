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
import Swal from 'sweetalert2';

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
      console.log(this.user);

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
        this.updateAddress();
      }
    });
  }

  updateAddress() {
    this.user = this.userSession.user;
    if (this.appService.lang == 'en')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your address updated successfully',
        showConfirmButton: false,
        timer: 2000,
      });
    else
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'تم تحديث العنوان بنجاح',
        showConfirmButton: false,
        timer: 2000,
      });
  }
}
