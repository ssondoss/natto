import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../app.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public appService: ApplicationStateService,
    public http: HttpClient
  ) {}

  ngOnInit(): void {}
}
