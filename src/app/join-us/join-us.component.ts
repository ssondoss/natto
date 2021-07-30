import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  arabicLetters,
  emailValidator,
  englishLetters,
  matchingPasswords,
} from '../app.component';
import { ApplicationStateService } from '../app.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.css', '../app.component.css'],
})
export class JoinUsComponent implements OnInit {
  private _jsonURL = 'assets/json/cities.json';
  saudi;

  joinUsForm: FormGroup;
  lastUploadedLogo = '';
  tags: Object;
  cities: Object;
  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public appService: ApplicationStateService
  ) {
    http.get(this._jsonURL).subscribe((data) => {
      this.cities = data;
    });
    if (this.appService.lang == 'en') this.saudi = 'Saudi Arabia';
    else this.saudi = 'السعودية';
  }

  ngOnInit(): void {
    this.clearjoinUsForm();
    this.getTags();
  }

  uploadImage(event) {
    let exe = event.target.files[0].name.split('.').pop();
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.http
        .post(environment.apiURL + '/file/upload?exe=.' + exe, formData)
        .subscribe(
          (data) => {
            this.lastUploadedLogo = data + '.' + exe;
            console.log(this.lastUploadedLogo);
          },
          (error) => {
            console.log(error);

            this.lastUploadedLogo = error.error.text + '.' + exe;
            console.log(this.lastUploadedLogo);
          }
        );
    }
  }

  getTags() {
    this.http
      .get(environment.apiURL + '/tag')
      .subscribe((data) => (this.tags = data));
  }

  addMerchant() {
    if (this.joinUsForm.valid) {
      this.http
        .post(environment.apiURL + '/user/add-user/', {
          blocked: false,
          deliveryAddress: {
            city: this.joinUsForm.controls['city'].value,
            country: this.joinUsForm.controls['country'].value,
          },
          email: this.joinUsForm.controls['email'].value,
          password: this.joinUsForm.controls['password'].value,
          phone: this.joinUsForm.controls['phone1'].value,
          role: 'MERCHANT_OWNER',
          username: this.joinUsForm.controls['nameEnglish'].value,
        })
        .subscribe((merchantOwner: any) => {
          this.http
            .post(environment.apiURL + '/merchant', {
              accepted: false,
              blocked: true,
              contactInfo: this.joinUsForm.controls['phone2'].value,
              descriptionArabic: this.joinUsForm.controls['desArabic'].value,
              descriptionEnglish: this.joinUsForm.controls['desEnglish'].value,
              logo: this.lastUploadedLogo,
              merchantOwner: merchantOwner.id,
              merchantStatus: 'OPENED',
              titleArabic: this.joinUsForm.controls['nameArabic'].value,
              titleEnglish: this.joinUsForm.controls['nameEnglish'].value,
              tag: this.joinUsForm.controls['tag'].value,
              city: this.joinUsForm.controls['city'].value,
            })
            .subscribe(
              (merchant: any) => {
                this.clearjoinUsForm();
                if (this.appService.lang == 'en')
                  swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title:
                      'Please wait admin acceptance , we will contact you as soon as possible',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                else
                  swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title:
                      'الرجاء انتظار موافقة المسوؤل ، سوف نقوم بالتواصل معك في اقرب وقت ',
                    showConfirmButton: false,
                    timer: 1500,
                  });
              },
              (error: any) => {
                if (error.message == 'Email Used') {
                  if (this.appService.lang == 'en')
                    swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: 'Email is already used !',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  else
                    swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: 'البريد الالكتروني مستخدم ',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                }
              }
            );
        });
    } else {
      this.joinUsForm.markAllAsTouched();
    }
  }

  clearUploadedImage() {
    this.lastUploadedLogo = '';
  }
  clearjoinUsForm() {
    this.lastUploadedLogo = '';
    this.joinUsForm = this.formBuilder.group(
      {
        nameEnglish: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(100),
            englishLetters,
          ]),
        ],

        nameArabic: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(100),
            arabicLetters,
          ]),
        ],

        desEnglish: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(250),
            englishLetters,
          ]),
        ],
        desArabic: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(250),
            arabicLetters,
          ]),
        ],

        tag: ['', Validators.compose([Validators.required])],
        logo: ['', Validators.required],
        phone1: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(10),
          ]),
        ],

        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(150),
            emailValidator,
          ]),
        ],

        phone2: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(10),
          ]),
        ],
        city: ['', Validators.compose([Validators.required])],
        country: [this.saudi],

        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(6),
          ]),
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: matchingPasswords('password', 'confirmPassword'),
      }
    );
  }

  getImageSource(image) {
    return environment.imageURL + image;
  }
}
