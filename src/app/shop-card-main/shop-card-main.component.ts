import { Component, Input, OnInit } from '@angular/core';
import { ApplicationStateService } from '../app.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'shop-card-main',
  templateUrl: './shop-card-main.component.html',
  styleUrls: ['./shop-card-main.component.css', '../app.component.css'],
})
export class ShopCardMainComponent implements OnInit {
  currentRate = 3;

  @Input() shop: any;
  constructor(
    public appService: ApplicationStateService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http
      .get(environment.apiURL + '/merchant-rating/' + this.shop.id)
      .subscribe((ratings: any) => {
        this.shop.ratings = ratings;

        this.shop.totalRatings = this.getTotalRatings(ratings);
      });
  }

  getTotalRatings(ratings) {
    let total = 0;
    if (ratings.length == 0) return 0;
    ratings.forEach((element) => {
      total += element.rate;
    });
    return Math.ceil(total / ratings.length);
  }

  getSource(image): string {
    return environment.imageURL + image;
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
