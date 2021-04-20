import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSessionService } from '../user-session.service';
import { Router } from '@angular/router';
import { ApplicationStateService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css', '../app.component.css'],
})
export class CheckoutComponent implements OnInit {
  addressForm: FormGroup;
  shoppingCart: any;
  user: any;
  mySuccessAlert = false;
  showSuccessAlert() {
    this.mySuccessAlert = true;
    setTimeout(() => {
      this.mySuccessAlert = false;
    }, 2000);
  }
  total = 0;
  tax = 0;
  subTotal = 0;
  discount = 0;
  serviceCharge = 0;
  withDiscount = false;
  hasAddress: boolean;
  voucher: any;
  constructor(
    public formBuilder: FormBuilder,

    private userSession: UserSessionService,
    private router: Router,
    public appService: ApplicationStateService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    if (!userSession.isLoggedIn) userSession.logout();
    else if (
      userSession.shoppingCart == undefined ||
      userSession.shoppingCart == null
    ) {
      router.navigate(['/all-shops']);
    } else if (userSession.shoppingCart.items.length == 0) {
    } else {
      this.shoppingCart = userSession.shoppingCart;
      this.user = userSession.user;
      http
        .get(
          environment.apiURL +
            '/merchant/get-byMerchant/' +
            this.shoppingCart.merchant.id
        )
        .subscribe((data: any) => {
          if (data.merchantStatus != 'OPENED') {
            if (this.appService.lang == 'en')
              swal
                .fire({
                  title: "Merchant is't available",
                  text: 'would you like to check another merchants?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#ff5a00',
                  cancelButtonColor: '#bbb',
                  confirmButtonText: 'Yes, see all shops !',
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/all-shops']);
                  } else {
                    this.router.navigate(['/']);
                  }
                });
            else
              swal
                .fire({
                  title: 'المتجر غير متاح حالياّّ',
                  text: 'هل تود تجربة متجر اخر ؟',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#ff5a00',
                  cancelButtonColor: '#bbb',
                  confirmButtonText: 'نعم ،الي جميع المتاجر',
                  cancelButtonText: 'الغاء',
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/all-shops']);
                  } else {
                    this.router.navigate(['/']);
                  }
                });
          }
        });
    }
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
  showDelForm = false;
  specialRequestForm = false;
  showDelFormAfterConfirm = false;
  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      country: ['', Validators.required],

      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(10),
        ]),
      ],
      city: ['', Validators.required],
      addressLineOne: ['', Validators.required],
      addressLineTwo: [''],
    });

    this.getTotal();
    if (
      this.user.address.addressLineOne == 'NA' ||
      this.user.address.addressLineTwo == 'NA' ||
      this.user.address.city == 'NA' ||
      this.user.address.country == 'NA'
    ) {
      this.hasAddress = false;
      this.addressForm = this.fb.group({
        phone: [this.user.phone],
        addressLineOne: [''],
        addressLineTwo: [''],
        city: [''],
        country: [''],
      });
    } else {
      this.hasAddress = true;
      this.addressForm = this.fb.group({
        phone: [this.user.phone],
        addressLineOne: [this.user.address.addressLineOne],
        addressLineTwo: [this.user.address.addressLineTwo],
        city: [this.user.address.city],
        country: [this.user.address.country],
      });
    }
  }
  showDeliveryForm() {
    this.showDelForm = true;
  }
  unshowDeliveryForm() {
    this.showDelForm = false;
    this.showDelFormAfterConfirm = true;
  }
  updateAddress() {
    this.http
      .post(environment.apiURL + '/user/update-user-address/' + this.user.id, {
        addressLineOne: this.addressForm.controls['addressLineOne'].value,
        addressLineTwo: this.addressForm.controls['addressLineTwo'].value,
        city: this.addressForm.controls['city'].value,
        country: this.addressForm.controls['country'].value,
      })
      .subscribe((data: any) => {
        this.hasAddress = true;
        this.userSession.user.address = data.deliveryAddress;
        this.user.address = data.deliveryAddress;

        this.http
          .post(
            environment.apiURL +
              '/user/update-user-mobile-number/' +
              this.user.id,
            this.addressForm.controls['phone'].value
          )
          .subscribe((data: any) => {
            this.userSession.user.phone = data.phone;
            this.user.phone = data.phone;
            let token = JSON.parse(localStorage.getItem('bazzar-user-jwt'));
            token.payload = this.userSession.user;
            localStorage.removeItem('bazzar-user-jwt');

            localStorage.setItem('bazzar-user-jwt', JSON.stringify(token));
            this.unshowDeliveryForm();
          });
      });
  }
  showSpecialRequestForm() {
    this.specialRequestForm = true;
  }
  unShowSpecialRequestForm() {
    this.specialRequestForm = false;
  }

  async getTotal() {
    this.subTotal = 0;
    await this.userSession.shoppingCart.items.forEach((item) => {
      this.subTotal += item.product.price * item.count;
    });
    this.tax = this.subTotal * 0.16;
    this.total = this.subTotal + this.tax + this.serviceCharge - this.discount;
  }

  redeemCode() {
    let code = (document.getElementById('code-input') as HTMLInputElement)
      .value;

    if (code.length > 0) {
      this.http
        .get(environment.apiURL + '/code/get-by-code/' + code)
        .subscribe(async (data: any) => {
          if (data != null) {
            this.voucher = data;
            this.withDiscount = true;
            this.discount = this.subTotal * data.value;
            await this.getTotal();
            if (this.appService.lang == 'en')
              swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Discount added successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            else
              swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'تم اضافة الخصم بنجاح',
                showConfirmButton: false,
                timer: 1500,
              });
          } else {
            if (this.appService.lang == 'en')
              swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Discount code is't exist",
                showConfirmButton: false,
                timer: 1500,
              });
            else
              swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'كوبون الخصم غير صحيح',
                showConfirmButton: false,
                timer: 1500,
              });
          }
        });
    }
  }

  createOrder() {
    let noteInput = document.getElementById('note') as HTMLInputElement;
    let note = noteInput == null ? '' : noteInput.value;
    console.log(note);
    let order = {
      city: this.addressForm.controls['city'].value,
      country: this.addressForm.controls['country'].value,
      dateAndTime: '2021-01-26T11:42:37.732Z',
      discountCodeId: 'string',
      fullName: this.user.username,
      merchantId: this.shoppingCart.merchant.id,
      note: note,
      orderStatus: 'PENDING',
      paymentMethod: 'CASH',
      phone: this.user.phone,
      products: [],
      shippingAddress: {
        addressLineOne: this.addressForm.controls['addressLineOne'].value,
        addressLineTwo: this.addressForm.controls['addressLineTwo'].value,
        city: this.addressForm.controls['city'].value,
        country: this.addressForm.controls['country'].value,
      },
      userId: this.user.id,
    };

    this.shoppingCart.items.forEach((item) => {
      order.products.push({
        product: item.product,
        quantity: item.count,
      });
    });
    this.http
      .post(environment.apiURL + '/order/', order)
      .subscribe((data: any) => {
        this.http
          .post(
            environment.apiURL +
              '/shopping-cart/clear-cart-by-user-id/' +
              this.shoppingCart.id,
            {}
          )
          .subscribe((emptyCart: any) => {
            this.userSession.shoppingCart = emptyCart;
            this.shoppingCart = emptyCart;
            if (this.appService.lang == 'en')
              swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your order Placed Successfully',
                showConfirmButton: false,
                timer: 2000,
              });
            else
              swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'لقد تم تقديم طلبك بنجاح  ',
                showConfirmButton: false,
                timer: 2000,
              });
          });
      });
    setTimeout(() => {
      this.router.navigate(['/my-account']);
    }, 2000);
  }
}
