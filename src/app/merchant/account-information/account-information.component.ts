import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationStateService } from 'src/app/app.service';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css', '../../app.component.css'],
})
export class AccountInformationComponent implements OnInit {
  merchantAccountForm;
  edit = false;
  merchant: any;
  private _jsonURL = 'assets/json/cities.json';
  cities: Object;

  constructor(
    public dialog: MatDialog,
    config: NgbRatingConfig,
    public appService: ApplicationStateService,
    private userSession: UserSessionService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    http.get(this._jsonURL).subscribe((data) => {
      this.cities = data;
    });
    this.http
      .get(
        environment.apiURL + '/merchant/get-byOwner/' + this.userSession.user.id
      )
      .subscribe((res) => {
        this.merchant = res;
        console.log(this.userSession.user);
      });
  }

  ngOnInit(): void {
    this.http
      .get(
        environment.apiURL + '/merchant/get-byOwner/' + this.userSession.user.id
      )
      .subscribe((res) => {
        this.merchant = res;

        this.merchantAccountForm = this.fb.group({
          company: [this.merchant.titleEnglish],
          username: [this.userSession.user.username],
          phone1: [
            this.userSession.user.phone,
            Validators.compose([
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(15),
              // prettier-ignore
              Validators.pattern("[0-9]*"),
            ]),
          ],
          phone2: [this.merchant.contactInfo],
          email: [this.userSession.user.email],
          tag: [this.merchant.tag],
          city: [this.merchant.city],
          country: ['Saudi Arabia'],
          descriptionArabic: [this.merchant.descriptionArabic],
          descriptionEnglish: [this.merchant.descriptionEnglish],
        });
      });

    this.merchantAccountForm = this.fb.group({
      company: [''],
      username: [this.userSession.user.username],
      phone1: [
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          // prettier-ignore
          Validators.pattern("[0-9]*"),
        ]),
      ],
      phone2: [],
      email: [''],
      tag: [''],
      city: [],
      country: [],
      descriptionArabic: [],
      descriptionEnglish: [],
    });
  }
  updateMerchantAccount() {
    this.http
      .put(environment.apiURL + '/merchant/' + this.merchant.id, {
        accepted: this.merchant.accepted,
        blocked: this.merchant.blocked,
        contactInfo: this.merchantAccountForm.controls['phone2'].value,
        descriptionArabic: this.merchantAccountForm.controls[
          'descriptionArabic'
        ].value,
        descriptionEnglish: this.merchantAccountForm.controls[
          'descriptionEnglish'
        ].value,
        logo: this.merchant.logo,
        merchantOwner: this.merchant.merchantOwner,
        merchantStatus: this.merchant.merchantStatus,
        tag: this.merchant.tag.id,
        city: this.merchantAccountForm.controls['city'].value,
        titleArabic: this.merchant.titleArabic,
        titleEnglish: this.merchant.titleEnglish,
      })
      .subscribe((data: any) => {
        this.merchant = data;
        this.http
          .put(environment.apiURL + '/user/' + this.userSession.user.id, {
            deliveryAddress: {
              addressLineOne: this.userSession.user.address.addressLineOne,
              addressLineTwo: this.userSession.user.address.addressLineTwo,
              city: this.userSession.user.address.city,
              country: this.userSession.user.address.country,
            },
            email: this.userSession.user.email,
            phone: this.merchantAccountForm.controls['phone1'].value,
            username: this.merchantAccountForm.controls['username'].value,
          })
          .subscribe((data: any) => {
            this.userSession.user = data;
            this.edit = !this.edit;
          });
      });
  }

  changeTheEditMode() {
    this.edit = !this.edit;
  }
}
