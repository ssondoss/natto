import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css'],
})
export class HomeComponent implements OnInit {
  currentRate = 5;
  categories: any;
  categoriesAr: any;
  categoriesEn: any;
  cities: Object;
  private _jsonURL = 'assets/json/cities.json';

  constructor(
    public appService: ApplicationStateService,
    private http: HttpClient,
    private router: Router
  ) {
    http.get(this._jsonURL).subscribe((data) => {
      this.cities = data;
    });
  }

  getAllCategories() {
    this.http.get(environment.apiURL + '/tag').subscribe((tags: any) => {
      this.categories = tags;

      this.categories.forEach((category: any) => {
        this.categoriesAr.push(category.nameArabic);
        this.categoriesEn.push(category.nameEnglish);
      });
      console.log(tags);
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  search() {
    let nameInput = document.getElementById('nameInput') as HTMLInputElement;
    let cityInput = document.getElementById('cityInput') as HTMLInputElement;

    let name =
      nameInput == undefined || nameInput == null ? '' : nameInput.value;
    // let tag =
    //   tagInput == undefined || tagInput == null ? 'all' : tagInput.value;
    let city =
      cityInput == undefined || cityInput == null ? 'all' : cityInput.value;
    this.router.navigate(['/all-shops'], {
      queryParams: { name: name, city: city, tag: 'all' },
    });
  }

  getIconSrc(logo) {
    return environment.imageURL + logo;
  }
}
