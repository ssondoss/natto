import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationStateService } from 'src/app/app.service';
import { UserSessionService } from 'src/app/user-session.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css', '../../app.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor(
    public appService: ApplicationStateService,
    private userSession: UserSessionService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          // prettier-ignore
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
  updatePassword() {}
}
