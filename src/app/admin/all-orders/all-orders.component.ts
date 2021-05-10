import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css', '../../app.component.css'],
})
export class AllOrdersComponent implements OnInit {
  orders: any[] = new Array();
  i = 0;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(environment.apiURL + '/order').subscribe((data: any) => {
      data.forEach((code) => {
        this.orders[this.i] = code;
        this.i++;
      });
      console.log(this.orders);
    });
  }
}
