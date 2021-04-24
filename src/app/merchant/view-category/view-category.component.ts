import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css', '../../app.component.css'],
})
export class ViewCategoryComponent implements OnInit {
  show = 0;
  maximize() {
    this.show = 1;
  }
  minimize() {
    this.show = 0;
  }
  show2 = 20;
  maximize2() {
    this.show2 = 2;
  }
  minimize2() {
    this.show2 = 20;
  }
  show3 = 30;
  maximize3() {
    this.show3 = 3;
  }
  minimize3() {
    this.show3 = 30;
  }
  show4 = 40;
  maximize4() {
    this.show4 = 4;
  }
  minimize4() {
    this.show4 = 40;
  }
  constructor() {}

  ngOnInit(): void {}
}
