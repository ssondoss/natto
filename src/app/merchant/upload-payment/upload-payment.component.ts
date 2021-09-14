import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from 'src/app/user-session.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationStateService } from 'src/app/app.service';

@Component({
  selector: 'app-upload-payment',
  templateUrl: './upload-payment.component.html',
  styleUrls: ['./upload-payment.component.css'],
})
export class UploadPaymentComponent implements OnInit {
  imageValue: string;
  merchant: any;
  payments: any = new Array();
  constructor(
    private http: HttpClient,
    public translate: TranslateService,
    private userSession: UserSessionService,
    public service: ApplicationStateService
  ) {
    if (!userSession.isLoggedIn) {
      userSession.logout();
    } else {
      this.http
        .get(
          environment.apiURL + '/merchant/get-byOwner/' + userSession.user.id
        )
        .subscribe((res) => {
          this.merchant = res;
          this.getPayments();
        });
    }
  }

  getPayments() {
    this.http
      .get(
        environment.apiURL + '/merchant-payment/by-merchant/' + this.merchant.id
      )
      .subscribe((data: any) => {
        this.payments = data;
      });
  }

  ngOnInit(): void {}
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
            this.imageValue = data + '.' + exe;
            this.http
              .post(environment.apiURL + '/merchant-payment', {
                image: this.imageValue,
                merchantId: this.merchant.id,
              })
              .subscribe(() => {
                this.getPayments();
                if (this.translate.currentLang == 'en')
                  swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added!',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                else
                  swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'تم الاضافة',
                    showConfirmButton: false,
                    timer: 1500,
                  });
              });
          },
          (error) => {
            if (error.status == 200)
              this.imageValue =
                error.error.text +
                '.' +
                event.target.files[0].name.split('.').pop();
            this.http
              .post(environment.apiURL + '/merchant-payment', {
                image: this.imageValue,
                merchantId: this.merchant.id,
              })
              .subscribe(() => {
                this.getPayments();
                if (this.translate.currentLang == 'en')
                  swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added!',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                else
                  swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'تم الاضافة',
                    showConfirmButton: false,
                    timer: 1500,
                  });
              });
          }
        );
    }
  }

  getImageSource(image) {
    return environment.imageURL + image;
  }

  goToIamge(image) {
    window.open(environment.imageURL + image);
  }
}
