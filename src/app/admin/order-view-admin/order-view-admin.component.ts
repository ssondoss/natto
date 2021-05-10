import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-view-admin',
  templateUrl: './order-view-admin.component.html',
  styleUrls: ['./order-view-admin.component.css', '../../app.component.css'],
})
export class OrderViewAdminComponent implements OnInit {
  show = 0;
  id: any;
  order: any;
  showItems() {
    this.show = 1;
  }
  unshowItems() {
    this.show = 0;
  }
  show1 = 0;
  maximize1() {
    this.show1 = 1;
  }
  minimize1() {
    this.show1 = 0;
  }
  show2 = 0;
  maximize2() {
    this.show2 = 1;
  }
  minimize2() {
    this.show2 = 0;
  }
  show3 = 0;
  maximize3() {
    this.show3 = 1;
  }
  minimize3() {
    this.show3 = 0;
  }
  show4 = 0;
  maximize4() {
    this.show4 = 1;
  }
  minimize4() {
    this.show4 = 0;
  }

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public translate: TranslateService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
      http
        .get(environment.apiURL + '/order/order-by-id/' + this.id)
        .subscribe((order: any) => {
          this.order = order;
          console.log(this.order);
        });
    });
  }

  getSource(image): string {
    return environment.apiURL + '/images/' + image;
  }
  ngOnInit(): void {}
}
