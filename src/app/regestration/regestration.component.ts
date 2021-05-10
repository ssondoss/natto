import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { emailValidator, matchingPasswords } from '../app.component';
import { ApplicationStateService } from '../app.service';
import { UserSessionService } from '../user-session.service';

@Component({
  selector: 'app-regestration',
  templateUrl: './regestration.component.html',
  styleUrls: ['./regestration.component.css', '../app.component.css'],
})
export class RegestrationComponent implements OnInit {
  regestrationForm: FormGroup;
  user: any;
  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private appService: ApplicationStateService,
    private userSession: UserSessionService
  ) {}

  ngOnInit(): void {
    this.regestrationForm = this.formBuilder.group(
      {
        username: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(3),
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

        phone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(10),
            // prettier-ignore
            Validators.pattern("[0-9]*"),
          ]),
        ],
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
  myDangerAlert = false;
  showDangerAlert() {
    this.myDangerAlert = true;

    setTimeout(() => {
      this.myDangerAlert = false;
    }, 2000);
  }
  addUser(values: FormGroup) {
    if (this.regestrationForm.valid) {
      this.http
        .post(environment.apiURL + '/user/add-user', {
          username: values.controls['username'].value,
          email: values.controls['email'].value,
          password: values.controls['password'].value,
          phone: values.controls['phone'].value,
          role: 'CLIENT',
          deliveryAddress: {},
          blocked: false,
        })
        .subscribe(
          (data: any) => {
            this.login(
              values.controls['email'].value,
              values.controls['password'].value
            );
          },
          (error) => {
            this.showDangerAlert();
          }
        );
    } else {
      this.regestrationForm.markAllAsTouched();
    }
  }
  login(email: string, password: string) {
    let httpParams = new HttpParams()
      .append('email', email)
      .append('password', password);
    this.http.post(environment.apiURL + '/auth', httpParams).subscribe(
      (data: any) => {
        localStorage.setItem('bazzar-user-jwt', JSON.stringify(data));
        this.userSession.login(JSON.stringify(data));
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status == 500)
          if (error.error.message == 'Incorrect email and/or password') {
            this.showDangerAlert();
          }
      }
    );
  }
}
