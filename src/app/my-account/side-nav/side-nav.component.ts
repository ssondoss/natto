import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  currentComponent: string;
  constructor() {
    this.currentComponent = window.location.href.split('/').pop();
  }

  ngOnInit(): void {}
}
