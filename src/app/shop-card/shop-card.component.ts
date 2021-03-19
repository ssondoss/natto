import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css', '../app.component.css'],
})
export class ShopCardComponent implements OnInit {
  currentRate = 5;

  constructor() {}

  ngOnInit(): void {}
}
