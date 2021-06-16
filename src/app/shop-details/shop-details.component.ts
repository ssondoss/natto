import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ApplicationStateService } from '../app.service';
import { UserSessionService } from '../user-session.service';
import swal from 'sweetalert2';
import { AddProduct } from './add-product/add-product.component';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css', '../app.component.css'],
})
export class ShopDetailsComponent implements OnInit {
  id: any;
  currentRate = 5;

  ratings_en = ['New', 'Bad', 'Not Bad', 'Very Good', 'Amazing'];
  ratings_ar = ['جديد', 'سئ', 'عادي', 'جيد', 'جيد جدا', 'رائع'];

  showMenuDiv = true;
  showReviewsDiv = false;
  showInfoDiv = false;
  merchant: any;
  categories: any;
  activeCategory: any;
  heddinCategories: Array<string> = [];
  allProducts: Array<any> = [];
  shoppingCart: Array<any> = [];
  filterKeyword = '';
  isFiltered = false;
  filteredProducts: any;
  ratings: any;
  totalRatings: any;
  constructor(
    public dialog: MatDialog,
    config: NgbRatingConfig,
    private route: ActivatedRoute,
    private routerNavigate: Router,
    private http: HttpClient,
    public appService: ApplicationStateService,
    public userSession: UserSessionService
  ) {
    config.max = 5;
    if (!userSession.isLoggedIn) {
      userSession.shoppingCart = { items: [] };
    }
  }

  scroll(id: any) {
    let el = document.getElementById(id);
    el.scrollIntoView();
  }
  show = true;
  showitems = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];

      this.http
        .get(environment.apiURL + '/merchant/get-byMerchant/' + this.id)
        .subscribe((data) => {
          this.merchant = data;
          console.log(this.merchant);
          this.http
            .get(environment.apiURL + '/merchant-rating/' + this.merchant.id)
            .subscribe((ratings: any) => {
              this.ratings = ratings;
              console.log(ratings);
              this.totalRatings = this.getTotalRatings();
            });
        });
      this.http
        .get(environment.apiURL + '/category/all-by-merchant-id/' + this.id)
        .subscribe((data) => {
          this.categories = data;
          this.activeCategory = this.categories[0].id;
          this.categories.forEach((category) => {
            this.http
              .get(
                environment.apiURL + '/product/by-category-id/' + category.id
              )
              .subscribe((data: any) => {
                category.products = data;
                data.forEach((element) => {
                  this.allProducts.push(element);
                });
              });
          });
          console.log(this.categories);
        });
    });
  }
  showReviews() {
    this.showMenuDiv = false;
    this.showReviewsDiv = true;
    this.showInfoDiv = false;
  }
  showInfo() {
    this.showMenuDiv = false;
    this.showReviewsDiv = false;
    this.showInfoDiv = true;
  }
  showMenu() {
    this.showMenuDiv = true;
    this.showReviewsDiv = false;
    this.showInfoDiv = false;
  }

  public close(id) {
    if (!this.isHidden(id)) this.heddinCategories.push(id);
    else this.heddinCategories = this.heddinCategories.filter((x) => x != id);
  }
  public showItems() {
    this.showitems = true;
  }
  itemAddedToCartAlert() {
    if (this.appService.lang == 'en')
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item added successfuly',
        showConfirmButton: false,
        timer: 1500,
      });
    else
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'تم اضافة العنصر بنجاح',
        showConfirmButton: false,
        timer: 1500,
      });
  }
  itemMerchantIsNotOpen() {
    if (this.appService.lang == 'en')
      swal.fire({
        position: 'top-end',
        icon: 'error',
        title:
          "Can't proccess cause merchant is " +
          this.getStatusEnglish(this.merchant.merchantStatus),
        showConfirmButton: false,
        timer: 1500,
      });
    else
      swal.fire({
        position: 'top-end',
        icon: 'error',
        title:
          'لا يمكن اتمام العملية لان المتجر ' +
          this.getStatusArabic(this.merchant.merchantStatus),
        showConfirmButton: false,
        timer: 1500,
      });
  }
  public openDialogAddProduct(product: any) {
    const dialogRef = this.dialog.open(AddProduct, {
      width: '1000px',
      height: 'auto',
      maxWidth: '98%',
      maxHeight: '98%',
      data: product,
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data.event == 'ADDED') {
        if (this.userSession.isLoggedIn) {
          await this.addToCart(product, data.count);
        } else if (this.appService.lang == 'en')
          swal
            .fire({
              title: 'Login',
              text: 'You must be logged in!\nWould you like to login?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#ff5a00',
              cancelButtonColor: '#bbb',
              confirmButtonText: 'Yes, go to Login !',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.routerNavigate.navigate(['/login']);
              }
            });
        else
          swal
            .fire({
              title: 'تسجيل الدخول',
              text: 'يجب تسجيل الدخول لاتمام العملية ! هل تريد تسجيل الدخول؟',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#ff5a00',
              cancelButtonColor: '#bbb',
              confirmButtonText: 'نعم ، تسجيل الدخول',
              cancelButtonText: 'الغاء',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.routerNavigate.navigate(['/login']);
              }
            });
      }
    });
  }
  async addToCart(product, count) {
    if (this.merchant.merchantStatus != 'OPENED') {
      console.log(this.merchant.merchantStatus);
      this.itemMerchantIsNotOpen();
    } else {
      console.log(this.userSession.shoppingCart);
      let httpParams = new HttpParams()
        .append('productId', product.id)
        .append('quantity', count);
      if (this.userSession.shoppingCart.merchant == null) {
        let httpParamsChangeMerchant = new HttpParams().append(
          'merchantId',
          this.merchant.id
        );
        await this.http
          .post(
            environment.apiURL +
              '/shopping-cart/change-merchant/' +
              this.userSession.shoppingCart.id,
            httpParamsChangeMerchant
          )
          .subscribe(async (data) => {
            this.userSession.shoppingCart = data;
            await this.http
              .post(
                environment.apiURL +
                  '/shopping-cart/add-item-to-cart/' +
                  this.userSession.shoppingCart.id,
                httpParams
              )
              .subscribe((data) => {
                this.userSession.shoppingCart = data;
                this.itemAddedToCartAlert();
              });
          });
      } else if (
        this.userSession.shoppingCart.merchant.id == this.merchant.id
      ) {
        this.http
          .post(
            environment.apiURL +
              '/shopping-cart/add-item-to-cart/' +
              this.userSession.shoppingCart.id,
            httpParams
          )
          .subscribe((data) => {
            this.userSession.shoppingCart = data;
            this.itemAddedToCartAlert();
          });
      } else if (
        this.userSession.shoppingCart.merchant.id != this.merchant.id
      ) {
        if (this.appService.lang == 'en') {
          console.log('en');
          await swal
            .fire({
              title: 'Shopping Cart',
              text: 'Adding items from another merchant will clear your old cart. ',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#ff5a00',
              cancelButtonColor: '#bbb',
              confirmButtonText: 'Yes, clear it !',
            })
            .then((result) => {
              console.log('confirmed');
              if (result.isConfirmed) {
                this.http
                  .post(
                    environment.apiURL +
                      '/shopping-cart/clear-cart-by-user-id/' +
                      this.userSession.shoppingCart.id,
                    {}
                  )
                  .subscribe((data) => {
                    this.userSession.shoppingCart = data;
                    let httpParamsChangeMerchant = new HttpParams().append(
                      'merchantId',
                      this.merchant.id
                    );
                    this.http
                      .post(
                        environment.apiURL +
                          '/shopping-cart/change-merchant/' +
                          this.userSession.shoppingCart.id,
                        httpParamsChangeMerchant
                      )
                      .subscribe((data) => {
                        this.userSession.shoppingCart = data;
                        this.http
                          .post(
                            environment.apiURL +
                              '/shopping-cart/add-item-to-cart/' +
                              this.userSession.shoppingCart.id,
                            httpParams
                          )
                          .subscribe((data) => {
                            this.userSession.shoppingCart = data;
                            this.itemAddedToCartAlert();
                          });
                      });
                  });
              }
            });
        } else {
          await swal
            .fire({
              title: 'سلة مشترياتك',
              text: 'لإضافة منتجات من متجر آخر يجب تفريغ السلة القديمة ',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#ff5a00',
              cancelButtonColor: '#bbb',
              confirmButtonText: 'نعم ، فرغها',
              cancelButtonText: 'الغاء',
            })
            .then((result) => {
              console.log('ar');
              if (result.isConfirmed) {
                this.http
                  .post(
                    environment.apiURL +
                      '/shopping-cart/clear-cart-by-user-id/' +
                      this.userSession.shoppingCart.id,
                    {}
                  )
                  .subscribe((data) => {
                    this.userSession.shoppingCart = data;
                    let httpParamsChangeMerchant = new HttpParams().append(
                      'merchantId',
                      this.merchant.id
                    );
                    this.http
                      .post(
                        environment.apiURL +
                          '/shopping-cart/change-merchant/' +
                          this.userSession.shoppingCart.id,
                        httpParamsChangeMerchant
                      )
                      .subscribe((data) => {
                        this.userSession.shoppingCart = data;
                        this.http
                          .post(
                            environment.apiURL +
                              '/shopping-cart/add-item-to-cart/' +
                              this.userSession.shoppingCart.id,
                            httpParams
                          )
                          .subscribe((data) => {
                            this.userSession.shoppingCart = data;
                            this.itemAddedToCartAlert();
                          });
                      });
                  });
              }
            });
        }
      }
    }
  }
  isHidden(id) {
    return this.heddinCategories.includes(id, 0);
  }

  getSource(image): string {
    return environment.imageURL + image;
  }

  filterResults() {
    if (this.filterKeyword != '') {
      this.isFiltered = true;
      this.filteredProducts = this.allProducts.filter((product: any) =>
        product.titleEnglish
          .toLowerCase()
          .includes(this.filterKeyword.toLowerCase())
      );
      console.log(this.filteredProducts);
    } else this.isFiltered = false;
  }

  removeItemFromCart(productId) {
    let httpParams = new HttpParams().append('productId', productId);
    this.http
      .post(
        environment.apiURL +
          '/shopping-cart/remove-item-from-cart/' +
          this.userSession.shoppingCart.id,
        httpParams
      )
      .subscribe((data) => {
        this.userSession.shoppingCart = data;
      });
  }

  increaseItemInCart(productId) {
    let httpParams = new HttpParams()
      .append('productId', productId)
      .append('quantity', '1');
    this.http
      .post(
        environment.apiURL +
          '/shopping-cart/add-item-to-cart/' +
          this.userSession.shoppingCart.id,
        httpParams
      )
      .subscribe((data) => (this.userSession.shoppingCart = data));
  }

  decreaseItemInCart(productId, count) {
    if (count == 1) {
      this.removeItemFromCart(productId);
    } else {
      let httpParams = new HttpParams()
        .append('productId', productId)
        .append('quantity', '-1');
      this.http
        .post(
          environment.apiURL +
            '/shopping-cart/add-item-to-cart/' +
            this.userSession.shoppingCart.id,
          httpParams
        )
        .subscribe((data) => (this.userSession.shoppingCart = data));
    }
  }

  getTotal() {
    let total = 0;
    this.userSession.shoppingCart.items.forEach((item) => {
      total += item.product.price * item.count;
    });
    return total;
  }

  getTax() {
    let total = this.getTotal();
    return total * 0.16;
  }

  getTotalRatings() {
    let total = 0;
    if (this.ratings.length == 0) return 0;
    this.ratings.forEach((element) => {
      total += element.rate;
    });

    return Math.ceil(total / this.ratings.length);
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
