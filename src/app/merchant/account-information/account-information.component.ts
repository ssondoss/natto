import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationStateService } from 'src/app/app.service';
import { UserSessionService } from 'src/app/user-session.service';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css', '../../app.component.css'],
})
export class AccountInformationComponent implements OnInit {
  merchantAccountForm;
  edit = false;

  constructor(
    public dialog: MatDialog,
    config: NgbRatingConfig,
    public appService: ApplicationStateService,
    private userSession: UserSessionService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.merchantAccountForm = this.fb.group({
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          // prettier-ignore
          Validators.pattern("[0-9]*"),
        ]),
      ],
      email: [''],
      username: [''],
    });
  }
  updateMerchantAccount() {}
  changeTheEditMode() {
    this.edit = !this.edit;
  }
}
