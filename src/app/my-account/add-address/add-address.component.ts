import { Component, OnInit, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { emailValidator } from '../../app.component';
import { ApplicationStateService } from 'src/app/app.service';
import { UserSessionService } from 'src/app/user-session.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css', '../../app.component.css'],
})
export class AddAddressComponent implements OnInit {
  user: any;
  cities: Object;
  private _jsonURL = 'assets/json/cities.json';

  saudi;
  constructor(
    public dialogRef: MatDialogRef<AddAddressComponent>,
    public formBuilder: FormBuilder,
    public appService: ApplicationStateService,
    public userSession: UserSessionService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    http.get(this._jsonURL).subscribe((data) => {
      this.cities = data;
    });
    if (this.appService.lang == 'en') this.saudi = 'Saudi Arabia';
    else this.saudi = 'السعودية';
    this.user = userSession.user;
  }
  addAddressForm: FormGroup;
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    if (
      this.user.address.addressLineOne == 'NA' ||
      this.user.address.addressLineTwo == 'NA' ||
      this.user.address.city == 'NA' ||
      this.user.address.phone == 'NA'
    ) {
      this.addAddressForm = this.formBuilder.group({
        phone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(10),
            Validators.pattern('[0-9]*'),
          ]),
        ],

        addressLineOne: [
          '',
          Validators.compose([Validators.maxLength(500), Validators.required]),
        ],
        addressLineTwo: ['', Validators.compose([Validators.maxLength(500)])],

        country: [this.saudi, Validators.required],
        city: ['', Validators.required],
      });
    } else {
      this.addAddressForm = this.formBuilder.group({
        phone: [
          this.user.phone,
          Validators.compose([
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(10),
            Validators.pattern('[0-9]*'),
          ]),
        ],

        addressLineOne: [
          this.user.address.addressLineOne,
          Validators.compose([Validators.maxLength(500), Validators.required]),
        ],
        addressLineTwo: [
          this.user.address.addressLineTwo,
          Validators.compose([Validators.maxLength(500)]),
        ],

        country: [this.saudi, Validators.required],
        city: [this.user.address.city, Validators.required],
      });
    }
  }

  confirmAddress() {
    if (this.addAddressForm.valid) {
      if (this.addAddressForm.valid) {
        this.http
          .post(
            environment.apiURL + '/user/update-user-address/' + this.user.id,
            {
              addressLineOne:
                this.addAddressForm.controls['addressLineOne'].value,
              addressLineTwo:
                this.addAddressForm.controls['addressLineTwo'].value,
              city: this.addAddressForm.controls['city'].value,
              country: this.addAddressForm.controls['country'].value,
            }
          )
          .subscribe(async (data: any) => {
            this.userSession.user.address = data.deliveryAddress;
            this.user.deliveryAddress = data.deliveryAddress;
            console.log(this.user);
            await this.http
              .post(
                environment.apiURL +
                  '/user/update-user-mobile-number/' +
                  this.user.id,
                this.addAddressForm.controls['phone'].value
              )
              .subscribe((data: any) => {
                this.addAddressForm.controls['phone'].setValue(data.phone);

                this.userSession.user.phone = data.phone;
                this.user.phone = data.phone;
                let token = JSON.parse(localStorage.getItem('bazzar-user-jwt'));

                token.payload = this.userSession.user;
                console.log(token);
                localStorage.setItem('bazzar-user-jwt', JSON.stringify(token));
                this.userSession.login(JSON.stringify(token));
                this.dialogRef.close({
                  event: 'ADDED',
                  user: this.user,
                });
              });
          });
      }
    } else this.addAddressForm.markAllAsTouched();
  }

  async updateAddress(form) {}
}
