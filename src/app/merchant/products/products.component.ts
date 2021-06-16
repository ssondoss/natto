import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { arabicLetters } from 'src/app/app.component';
import { ApplicationStateService } from 'src/app/app.service';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { EditProductComponent } from './edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../../app.component.css'],
})
export class ProductsComponent implements OnInit {
  product: any;

  productForm: FormGroup;

  show = 0;
  merchant: any;
  products: any;
  wardrobes: any;
  imageValue: string;

  maximize() {
    this.show = 1;
  }
  minimize() {
    this.show = 0;
  }
  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,

    public translate: TranslateService,
    private userSession: UserSessionService,
    public service: ApplicationStateService
  ) {
    if (!userSession.isLoggedIn) {
      userSession.logout();
    } else {
      this.http
        .get(
          environment.apiURL + '/merchant/get-byOwner/' + userSession.user.id
        )
        .subscribe((res) => {
          this.merchant = res;
          this.getWardrobe();
          this.http
            .get(
              environment.apiURL + '/product/by-merchant-id/' + this.merchant.id
            )
            .subscribe((data: any) => {
              this.products = data;
              console.log(this.products);
            });
        });
    }
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
      descriptionEnglish: ['', Validators.maxLength(250)],
      descriptionArabic: [
        '',
        Validators.compose([Validators.maxLength(250), arabicLetters]),
      ],
      deliveryDescription: ['', Validators.maxLength(250)],
      price: [, Validators.required],
      category: [, Validators.required],
      image: [, Validators.required],
    });
    this.imageValue = '';
  }

  deleteProduct(id: string) {
    if (this.translate.currentLang == 'en')
      swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.justDelete(id);
          }
        });
    else
      swal
        .fire({
          title: 'حذف ',
          text: 'هل انت متأكد؟',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'نعم, احذف',
          cancelButtonText: 'الغاء',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.justDelete(id);
          }
        });
  }

  justDelete(id) {
    this.http
      .delete(environment.apiURL + '/product/' + id)
      .subscribe((data: any) => {
        this.products = this.products.filter((product) => product.id != id);
        if (this.translate.currentLang == 'en')
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Deleted!',
            showConfirmButton: false,
            timer: 1500,
          });
        else
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'تم الحذف',
            showConfirmButton: false,
            timer: 1500,
          });
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

  addProduct() {
    if (this.productForm.valid) {
      this.http
        .post(environment.apiURL + '/product', {
          available: true,
          categoryId: this.productForm.controls['category'].value,
          deliveryDescription:
            this.productForm.controls['deliveryDescription'].value,
          descriptionArabic:
            this.productForm.controls['descriptionArabic'].value,
          descriptionEnglish:
            this.productForm.controls['descriptionEnglish'].value,
          image: this.imageValue,
          merchantId: this.merchant.id,
          price: this.productForm.controls['price'].value,
          titleArabic: this.productForm.controls['titleArabic'].value,
          titleEnglish: this.productForm.controls['titleEnglish'].value,
        })
        .subscribe((data) => {
          this.products.push(data);
          if (this.translate.currentLang == 'en')
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Added!',
              showConfirmButton: false,
              timer: 1500,
            });
          else
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'تم الاضافة',
              showConfirmButton: false,
              timer: 1500,
            });
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
            this.imageValue = data + '.' + exe;
          },
          (error) => {
            if (error.status == 200)
              this.imageValue =
                error.error.text +
                '.' +
                event.target.files[0].name.split('.').pop();
            console.log(
              this.imageValue +
                '.' +
                event.target.files[0].name.split('.').pop()
            );
          }
        );
    }
  }

  getImageSrc(logo) {
    return environment.imageURL + logo;
  }

  uploadFileClicked() {
    this.imageValue = '';
    //   document.getElementById('file-uploader').click;
  }

  openDialogEditProduct(product: any): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '900px',
      height: '84%',
      maxHeight: '99%',
      maxWidth: '98%',

      data: { product: product },
    });

    dialogRef.afterClosed().subscribe(async (updatedCategory) => {
      if (updatedCategory.event == 'UPDATED') {
        this.http
          .get(
            environment.apiURL + '/product/by-merchant-id/' + this.merchant.id
          )
          .subscribe((data: any) => {
            this.products = data;
            console.log(this.products);
          });
      }
    });
  }
}
