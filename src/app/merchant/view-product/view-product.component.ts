import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css', '../../app.component.css'],
})
export class ViewProductComponent implements OnInit {
  show = 0;
  id: any;
  product: any;
  category: any;
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
  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public translate: TranslateService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.http
        .get(environment.apiURL + '/product/' + this.id)
        .subscribe((productData: any) => {
          this.product = productData;
          console.log(productData);
          this.http
            .get(environment.apiURL + '/category/' + productData.categoryId)
            .subscribe((categoryData: any) => {
              this.category = categoryData;
              console.log(categoryData);
            });
        });
    });
  }

  getSource(image): string {
    return environment.imageURL + image;
  }
  ngOnInit(): void {}
}
