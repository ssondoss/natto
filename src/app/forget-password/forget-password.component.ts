import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { emailValidator } from '../app.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css', '../app.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  WrongEmail = false;
  constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    public formBuilder: FormBuilder
  ) {}
  forgetPasswordForm: FormGroup;
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(150),
          emailValidator,
        ]),
      ],
    });
  }
  mySuccessAlert = false;
  showSuccessAlert() {
    this.mySuccessAlert = true;
    setTimeout(() => {
      this.mySuccessAlert = false;
    }, 3000);
  }
  sendResetLink() {
    if (this.forgetPasswordForm.valid) {
      this.http
        .post(
          environment.apiURL +
            '/mail/send-reset-password-link/' +
            this.forgetPasswordForm.controls['email'].value,
          {}
        )
        .subscribe(
          (data) => {
            this.showSuccessAlert();
            setTimeout(() => {
              this.dialogRef.close();
            }, 3000);
          },
          (error) => {
            this.WrongEmail = true;
          }
        );
    }
  }
}
