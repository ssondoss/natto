import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../app.service';
import { UserSessionService } from '../user-session.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css'],
})
export class NavbarComponent implements OnInit {
  viewCountriesDiv = false;
  viewAccountDiv = false;
  constructor(
    public appService: ApplicationStateService,
    public http: HttpClient,
    public userSession: UserSessionService
  ) {}

  ngOnInit(): void {
    console.log(this.userSession);
  }
  viewCountries() {
    this.viewCountriesDiv = !this.viewCountriesDiv;
  }
  viewAccount() {
    this.viewAccountDiv = !this.viewAccountDiv;
  }
  logout() {
    this.userSession.logout();
  }
}
