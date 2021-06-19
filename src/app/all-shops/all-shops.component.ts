import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApplicationStateService } from '../app.service';

@Component({
  selector: 'app-all-shops',
  templateUrl: './all-shops.component.html',
  styleUrls: ['./all-shops.component.css', '../app.component.css'],
})
export class AllShopsComponent implements OnInit {
  shopsList: any;
  currentPage: any;
  pageable: any;
  totalPages: any;
  totalElements: any;
  pagesNumber: number[];
  tags: any;
  currentTag: string;
  withSearchkeyword: boolean;
  withSearchTag: boolean;
  withSearchCity: boolean;
  currentCity: any;
  searchKeyword: any;
  currentTagName: any;
  title: any;
  private _jsonURL = 'assets/json/cities.json';
  cities: Object;
  constructor(
    private http: HttpClient,
    public service: ApplicationStateService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    var object;
    http.get(this._jsonURL).subscribe((data) => {
      this.cities = data;
    });
    activatedRoute.queryParams.subscribe(async (params) => {
      console.log('here ');
      let name = params['name'];
      let tag = params['tag'];
      let city = params['city'];
      if (name != undefined && tag != undefined && city != undefined) {
        if (name == '' && tag == 'all' && city == '') {
          this.currentPage = 0;
          this.withSearchkeyword = false;
          this.currentTag = 'all';
          this.title = 'all';
          this.currentTagName = 'all';
          this.getPageOfShops(this.currentPage);
          this.getTags();
        } else {
          this.currentPage = 0;
          if (name != '') {
            this.withSearchkeyword = true;
            this.searchKeyword = name;
          }
          if (tag != 'all') {
            this.withSearchTag = true;
            this.currentTag = tag;
          }
          if (city != 'all') {
            this.withSearchCity = true;
            this.currentCity = city;
          }
          this.getPageOfShops(this.currentPage);
        }
      } else {
        this.currentPage = 0;
        this.withSearchkeyword = false;
        this.currentTag = 'all';
        this.currentTagName = 'all';
        this.getPageOfShops(this.currentPage);
        this.getTags();
      }
    });
  }
  ngOnInit(): void {}
  getPageOfShops(page: number) {
    console.log('get page');
    this.currentPage = page;
    console.log('1');

    let url = environment.apiURL;
    let httpParams = new HttpParams();
    if (this.withSearchkeyword && this.withSearchTag && this.withSearchCity) {
      console.log('2');
      url += '/merchant/page-of-merchants-by-name-and-tag-and-city';
      httpParams = new HttpParams()
        .append('page', page + '')
        .append('size', '4')
        .append('city', this.currentCity)
        .append('sequence', this.searchKeyword)
        .append('tag', this.currentTag);
      this.title = 'Search Results...';
    } else if (this.withSearchCity && this.withSearchTag) {
      console.log('6');
      url += '/merchant/page-of-merchants-by-tag-and-city';
      httpParams = new HttpParams()
        .append('page', page + '')
        .append('size', '4')
        .append('tag', this.currentTag)
        .append('city', this.currentCity);
      this.title = 'Search Results...';
    } else if (this.withSearchCity && this.withSearchkeyword) {
      console.log('7');
      url += '/merchant/page-of-merchants-by-name-and-city';
      httpParams = new HttpParams()
        .append('page', page + '')
        .append('size', '4')
        .append('sequence', this.searchKeyword)
        .append('city', this.currentCity);
      this.title = 'Search Results...';
    } else if (this.withSearchTag && this.withSearchkeyword) {
      console.log('8');
      url += '/merchant/page-of-merchants-by-name-and-city';
      httpParams = new HttpParams()
        .append('page', page + '')
        .append('size', '4')
        .append('sequence', this.searchKeyword)
        .append('tag', this.currentTag);
      this.title = 'Search Results...';
    } else if (this.withSearchkeyword) {
      console.log('3');
      url += '/merchant/page-of-merchants-by-name-like';
      httpParams = new HttpParams()
        .append('page', page + '')
        .append('size', '4')
        .append('sequence', this.searchKeyword);
      this.title = 'Search Results...';
    } else if (this.withSearchTag) {
      console.log('4');
      url += '/merchant/page-of-merchants-by-tag';
      httpParams = new HttpParams()
        .append('page', page + '')
        .append('size', '4')
        .append('tag', this.currentTag);
      this.title = 'Search Results...';
    } else if (this.withSearchCity) {
      console.log('5');
      url += '/merchant/page-of-merchants-by-city';
      httpParams = new HttpParams()
        .append('page', page + '')
        .append('size', '4')
        .append('city', this.currentCity);
      this.title = 'Search Results...';
    } else {
      console.log('9');
      url += '/merchant/page-of-merchants/';
      httpParams = new HttpParams()
        .append('page', page + '')
        .append('size', '4');
      this.title = 'all';
    }
    console.log('10');
    this.http
      .get(url, {
        params: httpParams,
      })
      .subscribe((data: any) => {
        this.pageable = data.pageable;
        this.totalPages = data.totalPages;

        this.pagesNumber = Array(this.totalPages);
        for (let index = 1; index <= this.totalPages; index++) {
          this.pagesNumber[index - 1] = index;
        }

        this.totalElements = data.totalElements;
        this.shopsList = data.content;

        console.log(this.shopsList);
      });
  }

  getTags() {
    this.http.get(environment.apiURL + '/tag').subscribe((data) => {
      this.tags = data;
      console.log(this.tags);
    });
  }

  getPageOfShopsByTag(page: number, tag: string) {
    this.currentPage = page;
    let httpParams = new HttpParams()
      .append('page', page + '')
      .append('size', '4')
      .append('tag', tag);
    this.http
      .get(environment.apiURL + '/merchant/page-of-merchants-by-tag/', {
        params: httpParams,
      })
      .subscribe((data: any) => {
        this.pageable = data.pageable;
        this.totalPages = data.totalPages;
        console.log('total pages' + this.totalPages);
        this.pagesNumber = Array(this.totalPages);
        for (let index = 1; index <= this.totalPages; index++) {
          this.pagesNumber[index - 1] = index;
        }

        this.totalElements = data.totalElements;
        this.shopsList = data.content;
        console.log(this.shopsList);
      });
  }

  changeTag(tag) {
    this.withSearchkeyword = false;
    if (tag != this.currentTag) {
      this.currentTag = tag;
      if (this.currentTag == 'all') this.getPageOfShops(0);
      else {
        this.tags.forEach((element) => {
          console.log(tag);
          if (element.id == tag) {
            this.currentTagName = element.nameEnglish;
            console.log('foundone');
          }
        });
        this.getPageOfShopsByTag(0, tag);
      }
    }
  }

  changePage(page) {
    this.getPageOfShops(page);
  }

  // search(value) {
  //   this.withSearchkeyword = true;
  //   this.searchKeyword = value;
  //   this.currentPage = 0;
  //   let httpParams = new HttpParams()
  //     .append('page', 0 + '')
  //     .append('size', '4')
  //     .append('sequence', value);
  //   this.http
  //     .get(environment.apiURL + '/merchant/page-of-merchants-by-name-like/', {
  //       params: httpParams,
  //     })
  //     .subscribe((data: any) => {
  //       this.pageable = data.pageable;
  //       this.totalPages = data.totalPages;
  //       console.log('total pages' + this.totalPages);
  //       this.pagesNumber = Array(this.totalPages);
  //       for (let index = 1; index <= this.totalPages; index++) {
  //         this.pagesNumber[index - 1] = index;
  //       }

  //       this.totalElements = data.totalElements;
  //       this.shopsList = data.content;
  //       console.log(this.shopsList);
  //     });
  // }

  getAnotherPageOfSearch(value, page) {
    this.withSearchkeyword = true;
    this.currentPage = page;
    let httpParams = new HttpParams()
      .append('page', page + '')
      .append('size', '2')
      .append('sequence', value);
    this.http
      .get(environment.apiURL + '/merchant/page-of-merchants-by-name-like/', {
        params: httpParams,
      })
      .subscribe((data: any) => {
        this.pageable = data.pageable;
        this.totalPages = data.totalPages;
        console.log('total pages' + this.totalPages);
        this.pagesNumber = Array(this.totalPages);
        for (let index = 1; index <= this.totalPages; index++) {
          this.pagesNumber[index - 1] = index;
        }

        this.totalElements = data.totalElements;
        this.shopsList = data.content;
        console.log(this.shopsList);
      });
  }

  search() {
    let nameInput = document.getElementById('name') as HTMLInputElement;
    let cityInput = document.getElementById('city') as HTMLInputElement;
    let tagInput = document.getElementById('tag') as HTMLInputElement;
    let name =
      nameInput == undefined || nameInput == null ? '' : nameInput.value;
    let tag =
      tagInput == undefined || tagInput == null ? 'all' : tagInput.value;
    let city =
      cityInput == undefined || cityInput == null ? '' : cityInput.value;

    if (name != undefined && tag != undefined && city != undefined) {
      if (name == '' && tag == 'all' && city == '') {
        this.currentPage = 0;
        this.withSearchkeyword = false;
        this.withSearchCity = false;
        this.withSearchTag = false;
        this.currentTag = 'all';
        this.title = 'all';
        this.currentTagName = 'all';
        this.getPageOfShops(this.currentPage);
        this.getTags();
      } else {
        this.currentPage = 0;
        if (name != '') {
          this.withSearchkeyword = true;
          this.searchKeyword = name;
        } else {
          this.withSearchkeyword = false;
        }
        if (tag != 'all') {
          this.withSearchTag = true;
          this.currentTag = tag;
        } else {
          this.withSearchTag = false;
        }
        if (city != '') {
          this.withSearchCity = true;
          this.currentCity = city;
        } else {
          this.withSearchCity = false;
        }
        this.getPageOfShops(this.currentPage);
      }
    } else {
      this.currentPage = 0;
      this.withSearchkeyword = false;
      this.currentTag = 'all';
      this.currentTagName = 'all';
      this.getPageOfShops(this.currentPage);
      this.getTags();
    }
  }
}
