import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css'],
})
export class HomeComponent implements OnInit {
  currentRate = 5;

  constructor(public appService: ApplicationStateService) {}

  ngOnInit(): void {}
  categories = [
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
    { titleEnglish: 'yousef' },
  ];
}
