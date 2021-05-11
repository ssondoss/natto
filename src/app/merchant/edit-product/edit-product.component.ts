import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationStateService } from 'src/app/app.service';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css', '../../app.component.css'],
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  id: any;
  product: any;
  wardrobes: any;
  merchant: any;
  selectedImage: any;
  isImageUploaded = false;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public translate: TranslateService,
    public service: ApplicationStateService,
    public userSession: UserSessionService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
      if (!userSession.isLoggedIn) {
        userSession.logout();

        console.log('NOT IN ' + userSession.isLoggedIn);
      } else {
        this.http
          .get(
            environment.apiURL + '/merchant/get-byOwner/' + userSession.user.id
          )
          .subscribe((res) => {
            this.merchant = res;
            this.getWardrobe();
            this.http
              .get(environment.apiURL + '/product/' + this.id)
              .subscribe((data: any) => {
                this.product = data;
                this.selectedImage = data.image;
                this.productForm = this.formBuilder.group({
                  titleEnglish: [
                    this.product.titleEnglish,
                    Validators.compose([
                      Validators.required,
                      Validators.maxLength(100),
                    ]),
                  ],
                  titleArabic: [
                    this.product.titleArabic,
                    Validators.compose([
                      Validators.required,
                      Validators.maxLength(100),
                    ]),
                  ],
                  descriptionEnglish: [
                    this.product.descriptionEnglish,
                    Validators.maxLength(250),
                  ],
                  descriptionArabic: [
                    this.product.descriptionArabic,
                    Validators.maxLength(250),
                  ],
                  deliveryDescription: [
                    this.product.deliveryDescription,
                    Validators.maxLength(250),
                  ],

                  price: [this.product.price, Validators.required],
                  category: [this.product.categoryId, Validators.required],
                });
              });
          });
      }
    });
  }

  getWardrobe() {
    this.http
      .get(
        environment.apiURL + '/category/all-by-merchant-id/' + this.merchant.id
      )
      .subscribe((data: any) => {
        this.wardrobes = data;
      });
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      titleEnglish: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      titleArabic: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      descriptionEnglish: ['', Validators.maxLength(250)],
      descriptionArabic: ['', Validators.maxLength(250)],
      deliveryDescription: ['', Validators.maxLength(250)],
      count: [, Validators.required],
      price: [, Validators.required],
      category: [, Validators.required],
      image: [],
    });
  }

  update() {
    this.http
      .post(environment.apiURL + '/product/update-by-id/', {
        available: true,
        categoryId: this.productForm.controls['category'].value,
        deliveryDescription: this.productForm.controls['deliveryDescription']
          .value,
        descriptionArabic: this.productForm.controls['descriptionArabic'].value,
        descriptionEnglish: this.productForm.controls['descriptionEnglish']
          .value,
        image: this.selectedImage,
        merchantId: this.merchant.id,
        price: this.productForm.controls['price'].value,
        titleArabic: this.productForm.controls['titleArabic'].value,
        titleEnglish: this.productForm.controls['titleEnglish'].value,
        createdOn: this.product.createdOn,
        id: this.id,
        updatedOn: null,
      })
      .subscribe((data: any) => {
        if (this.translate.currentLang == 'en')
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Updated!',
            showConfirmButton: false,
            timer: 1500,
          });
        else
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'تم التحديث',
            showConfirmButton: false,
            timer: 1500,
          });
      });
  }

  uploadImage(event) {
    let exe = event.target.files[0].name.split('.').pop();
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.http
        .post(environment.apiURL + '/file/upload?exe=.' + exe, formData)
        .subscribe(
          (data) => {
            this.selectedImage = data + '.' + exe;
            this.isImageUploaded = true;
          },
          (error) => {
            if (error.status == 200) {
              this.isImageUploaded = true;
              this.selectedImage =
                error.error.text +
                '.' +
                event.target.files[0].name.split('.').pop();
              console.log(
                this.selectedImage +
                  '.' +
                  event.target.files[0].name.split('.').pop()
              );
            }
          }
        );
    }
  }
}
