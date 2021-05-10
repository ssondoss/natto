import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css', '../../app.component.css'],
})
export class UpdateUserComponent implements OnInit {
  user: any;
  userID: any;
  userToUpdate: FormGroup;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private userSession: UserSessionService
  ) {
    if (localStorage.getItem('bazzar-admin-user-jwt') == null) {
      userSession.logout();
    }
    this.route.queryParams.subscribe((params) => {
      this.userID = params['id'];
    });
  }

  ngOnInit() {
    this.http
      .get(environment.apiURL + '/user/' + this.userID)
      .subscribe((data: any) => {
        this.user = data;
      });
    this.userToUpdate = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      phone: [
        '',
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      deliveryAddress: this.formBuilder.group({
        addressLineOne: [
          '',
          Validators.compose([Validators.required, Validators.minLength(1)]),
        ],
        addressLineTwo: [
          '',
          Validators.compose([Validators.required, Validators.minLength(1)]),
        ],
        city: [
          '',
          Validators.compose([Validators.required, Validators.minLength(1)]),
        ],
        country: [
          '',
          Validators.compose([Validators.required, Validators.minLength(1)]),
        ],
      }),
    });
  }

  updateUser(values: Object): void {
    this.http
      .put(environment.apiURL + '/user/' + this.userID, values)
      .subscribe((data: any) => {
        this.user = data;
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User Updated Successfuly!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
