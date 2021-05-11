import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css', '../../app.component.css'],
})
export class DiscountComponent implements OnInit {
  codeForm: FormGroup;
  codes: any[] = new Array();
  i = 0;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private userSession: UserSessionService
  ) {
    if (localStorage.getItem('bazzar-admin-user-jwt') == null) {
      userSession.logout();
    }
    this.codeForm = this.formBuilder.group({
      code: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      value: [
        '',
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  }
  ngOnInit() {
    this.http.get(environment.apiURL + '/code').subscribe((data: any) => {
      data.forEach((code) => {
        this.codes[this.i] = code;
        this.i++;
      });
      console.log(this.codes);
    });
  }

  addDiscountCode(valuse: Object) {
    this.http
      .post(environment.apiURL + '/code', valuse)
      .subscribe((data: any) => {
        this.codes[this.i] = data;
        this.i++;
      });
    this.codeForm.controls['code'].setValue('');
    this.codeForm.controls['value'].setValue('');
    swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Code Added Successfuly!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  deleteCode(id: string, code: string) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You will delete code ' + code + '!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.http
            .delete(environment.apiURL + '/code/' + id)
            .subscribe((data: any) => {
              this.codes.forEach((code) => {
                if (code.id == id) {
                  this.codes.splice(this.codes.indexOf(code), 1);
                  this.i--;
                }
              });
            });
        }
      });
  }
}
