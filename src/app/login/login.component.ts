import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApplicationStateService } from '../app.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { UserSessionService } from '../user-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  messageWrongEmailOrPassword = false;
  messageRequired = false;
  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private appService: ApplicationStateService,
    private userSession: UserSessionService
  ) {}
  openDialogForgetPassword(): void {
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '420px',
      height: 'auto',
      maxWidth: '95%',

      data: {},
    });
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      email: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(150)]),
      ],
    });
  }
  login() {
    if (this.loginForm.valid) {
      let httpParams = new HttpParams()
        .append('email', this.loginForm.controls['email'].value)
        .append('password', this.loginForm.controls['password'].value);
      this.http.post(environment.apiURL + '/auth', httpParams).subscribe(
        async (data: any) => {
          if (data.payload.role == 'CLIENT') {
            localStorage.setItem('bazzar-user-jwt', JSON.stringify(data));
            this.userSession.login();
            this.router.navigate(['/']);
            this.messageRequired = false;
          } else if (data.payload.role == 'MERCHANT_OWNER') {
            localStorage.setItem(
              'bazzar-merchant-user-jwt',
              JSON.stringify(data)
            );
            await this.http
              .get(
                environment.apiURL + '/merchant/get-byOwner/' + data.payload.id
              )
              .subscribe((merchant: any) => {
                localStorage.setItem(
                  'bazzar-merchant-merchant-info',
                  JSON.stringify(merchant)
                );
                window.location.href = 'http://164.68.99.181/merchant';
              });
          } else if (data.payload.role == 'ADMIN') {
            localStorage.setItem('bazzar-admin-user-jwt', JSON.stringify(data));
            window.location.href = 'http://164.68.99.181/admin';
          }
        },
        (error) => {
          if (error.status == 500) this.messageWrongEmailOrPassword = true;
          this.messageRequired = false;
        }
      );
    } else {
      this.loginForm.controls.password.markAsTouched();
      this.loginForm.controls.email.markAsTouched();
      //  this.messageRequired = true;
      this.messageWrongEmailOrPassword = false;
    }
  }
}
