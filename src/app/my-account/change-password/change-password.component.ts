import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationStateService } from 'src/app/app.service';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css', '../../app.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  userID: any;
  code: any;
  constructor(
    public appService: ApplicationStateService,
    private userSession: UserSessionService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(99),
        ]),
      ],
      newPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(99),
          // prettier-ignore
        ]),
      ],
      repeateNewPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(99),
          // prettier-ignore
        ]),
      ],
    });
  }
  updatePassword() {
    let newPassword = this.changePasswordForm.controls['newPassword'].value;
    let repeateNewPassword =
      this.changePasswordForm.controls['repeateNewPassword'].value;
    if (newPassword == repeateNewPassword) {
      let httpParams = new HttpParams()
        .append('newPassword', newPassword)
        .append(
          'oldPassword',
          this.changePasswordForm.controls['oldPassword'].value
        )
        .append(
          'confirmationPassword',
          this.changePasswordForm.controls['repeateNewPassword'].value
        );
      this.http
        .post(
          environment.apiURL +
            '/user/update-user-password/' +
            this.userSession.user.id,
          {
            newPassword: newPassword,
            oldPassword: this.changePasswordForm.controls['oldPassword'].value,
            confirmationPassword:
              this.changePasswordForm.controls['repeateNewPassword'].value,
          }
        )
        .subscribe(
          (data: any) => {
            if (this.appService.lang == 'en')
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Changed successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            else
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'تم بنجاح',
                showConfirmButton: false,
                timer: 1500,
              });
          },
          (error: any) => {
            if (this.appService.lang == 'en')
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Wrong Opration',
                showConfirmButton: false,
                timer: 1500,
              });
            else
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'حدث خطاء بالعملية ',
                showConfirmButton: false,
                timer: 1500,
              });
          }
        );
    } else {
      if (this.appService.lang == 'en')
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: "Passwords didn't match",
          showConfirmButton: false,
          timer: 1500,
        });
      else
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'كلمة السر غير متطابقة  ',
          showConfirmButton: false,
          timer: 1500,
        });
    }
  }
}
