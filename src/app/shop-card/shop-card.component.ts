import { Component, OnInit, Input } from '@angular/core';
import { ApplicationStateService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css', '../app.component.css'],
})
export class ShopCardComponent implements OnInit {
  currentRate = 5;

  @Input() shop: any;
  ratingsCount: any;
  constructor(
    public appService: ApplicationStateService,
    private http: HttpClient,
    private router: Router
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
    this.ratingsCount = ratings.length;
    console.log(this.ratingsCount);
    if (ratings.length == 0) return 0;
    ratings.forEach((element) => {
      total += element.rate;
    });
    return Math.ceil(total / ratings.length);
  }

  getSource(image): string {
    return environment.imageURL + image;
  }

  goToMerchant(id: string) {
    this.router.navigate(['/shop'], { queryParams: { id: id } });
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
}
