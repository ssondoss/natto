import { Component, Input, OnInit } from '@angular/core';
import { ApplicationStateService } from '../app.service';

@Component({
  selector: 'shop-card-main',
  templateUrl: './shop-card-main.component.html',
  styleUrls: ['./shop-card-main.component.css', '../app.component.css'],
})
export class ShopCardMainComponent implements OnInit {
  currentRate = 3;

  @Input() shop: any;
  constructor(public appService: ApplicationStateService) {}

  ngOnInit(): void {}

  getSource(image): string {
    return 'http://164.68.99.181' + '/images/' + image;
  }

  getStatusEnglish(value: string) {
    switch (value) {
      case 'OPENED':
        return 'Open';
        break;
      case 'CLOSED':
        return 'Close';
        break;
      case 'BUSY':
        return 'Busy';
        break;

      default:
        return 'Open';
    }
  }

  getStatusArabic(value: string) {
    switch (value) {
      case 'OPENED':
        return 'مفتوح';
        break;
      case 'CLOSED':
        return 'مغلق';
        break;
      case 'BUSY':
        return 'مشغول';
        break;

      default:
        return 'مفتوح';
    }
  }

  getStatusEN(status) {}
}
