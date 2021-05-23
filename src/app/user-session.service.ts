import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  isLoggedIn: boolean;
  user: User;
  shoppingCart: any;
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('bazzar-user-jwt') != null) {
      this.login(localStorage.getItem('bazzar-user-jwt'));
    } else if (localStorage.getItem('bazzar-merchant-user-jwt') != null) {
      this.login(localStorage.getItem('bazzar-merchant-user-jwt'));
    } else {
      this.isLoggedIn = false;
      this.user = null;
    }
  }

  login(user: any) {
    console.log(user);
    user = JSON.parse(user);
    this.isLoggedIn = true;
    this.user = new User();
    this.user.id = user.payload.id;
    this.user.email = user.payload.email;
    this.user.username = user.payload.username;
    this.user.phone = user.payload.phone;
    this.user.role = user.payload.role;
    this.user.address = user.payload.deliveryAddress;

    this.http
      .get(
        environment.apiURL +
          '/shopping-cart/get-cart-by-user-id/' +
          this.user.id
      )
      .subscribe((data) => (this.shoppingCart = data));
  }

  logout() {
    localStorage.removeItem('bazzar-user-jwt');
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['/']);
  }
}
