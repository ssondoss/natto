import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationStateService } from 'src/app/app.service';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import { EditCategoryComponent } from '../../categories/edit-category/edit-category.component';
import swal from 'sweetalert2';
import { arabicLetters } from 'src/app/app.component';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css', '../../../app.component.css'],
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  id: any;
  product: any;
  wardrobes: any;
  merchant: any;
  selectedImage: any;
  isImageUploaded = false;
  imageValue: any;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    public translate: TranslateService,
    public service: ApplicationStateService,
    public userSession: UserSessionService,
    @Inject(MAT_DIALOG_DATA) public data: any
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

            this.product = data.product;
            this.selectedImage = data.image;
            this.imageValue = this.product.image;
            console.log(this.imageValue);
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
                  arabicLetters,
                  Validators.maxLength(100),
                ]),
              ],
              descriptionEnglish: [
                this.product.descriptionEnglish,
                Validators.compose([
                  Validators.required,
                  Validators.maxLength(250),
                ]),
              ],
              descriptionArabic: [
                this.product.descriptionArabic,
                Validators.compose([
                  Validators.required,
                  Validators.maxLength(250),
                  arabicLetters,
                ]),
              ],
              deliveryDescription: [
                this.product.deliveryDescription,
                Validators.compose([
                  Validators.required,
                  Validators.maxLength(250),
                ]),
              ],
              image: [this.product.image, Validators.required],

              price: [this.product.price, Validators.required],
              category: [this.product.categoryId, Validators.required],
            });
          });
      }
    });
  }
  uploadFileClicked() {
    this.imageValue = '';
    this.productForm.controls['image'].setValue('');
    //   document.getElementById('file-uploader').click;
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
  getImageSrc(logo) {
    return environment.imageURL + logo;
  }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      titleEnglish: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      titleArabic: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          arabicLetters,
        ]),
      ],
      descriptionEnglish: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      descriptionArabic: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(250),
          arabicLetters,
        ]),
      ],
      deliveryDescription: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      count: [, Validators.required],
      price: [, Validators.required],
      category: [, Validators.required],
      image: ['', Validators.required],
    });
    this.imageValue = '';
  }

  update() {
    if (this.productForm.valid && this.imageValue != '') {
      this.http
        .post(environment.apiURL + '/product/update-by-id/', {
          available: true,
          categoryId: this.productForm.controls['category'].value,
          deliveryDescription: this.productForm.controls['deliveryDescription']
            .value,
          descriptionArabic: this.productForm.controls['descriptionArabic']
            .value,
          descriptionEnglish: this.productForm.controls['descriptionEnglish']
            .value,
          image: this.imageValue,
          merchantId: this.merchant.id,
          price: this.productForm.controls['price'].value,
          titleArabic: this.productForm.controls['titleArabic'].value,
          titleEnglish: this.productForm.controls['titleEnglish'].value,
          createdOn: this.product.createdOn,
          id: this.product.id,
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
          this.dialogRef.close({ event: 'UPDATED', data: data });
        });
    } else this.productForm.markAllAsTouched();
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
              this.imageValue = this.selectedImage;
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

  onNoClick(): void {
    this.dialogRef.close({ event: 'CANCELED' });
  }
}
