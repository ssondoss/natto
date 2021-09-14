import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { arabicLetters } from 'src/app/app.component';
import { UserSessionService } from 'src/app/user-session.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { EditCategoryComponent } from './edit-category/edit-category.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../../app.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  lang = 'en';
  show = 0;
  merchant: any;
  wordrobes: any = new Array();
  maximize() {
    this.show = 1;
  }
  minimize() {
    this.show = 0;
  }
  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private http: HttpClient,
    public dialog: MatDialog,

    private router: Router,
    private userSession: UserSessionService
  ) {
    // translate.setDefaultLang(this.lang);
    // translate.addLangs(['en', 'ar']);

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
        });

      this.categoryForm = this.formBuilder.group({
        titleEnglish: ['', Validators.compose([Validators.required])],
        titleArabic: [
          '',
          Validators.compose([Validators.required, arabicLetters]),
        ],
      });
    }
  }

  ngOnInit(): void {}

  openDialogEditCategory(category: any): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '700px',
      height: 'auto',
      maxWidth: '98%',

      data: { category: category },
    });

    dialogRef.afterClosed().subscribe(async (updatedCategory) => {
      if (updatedCategory.event == 'UPDATED') {
        this.wordrobes.forEach((element) => {
          if (element.id == updatedCategory.data.id) {
            element.titleEnglish = updatedCategory.data.titleEnglish;
            element.titleArabic = updatedCategory.data.titleArabic;
          }
        });
      }
    });
  }

  getWardrobe() {
    console.log(this.merchant);
    this.http
      .get(
        environment.apiURL + '/category/all-by-merchant-id/' + this.merchant.id
      )
      .subscribe((data: any) => {
        this.wordrobes = data;
        console.log(this.wordrobes);
      });
  }
  addWardrobe(values: FormGroup) {
    if (this.categoryForm.valid) {
      this.http
        .post(environment.apiURL + '/category', {
          merchantId: this.merchant.id,
          titleArabic: values.controls['titleArabic'].value,
          titleEnglish: values.controls['titleEnglish'].value,
        })
        .subscribe((data: any) => {
          this.wordrobes.push(data);
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
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  deleteWardrobe(id: string) {
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
            this.justDeleteWardrobe(id);
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
            this.justDeleteWardrobe(id);
          }
        });
  }
  justDeleteWardrobe(id: string) {
    this.http.delete(environment.apiURL + '/category/' + id).subscribe(() => {
      this.wordrobes = this.wordrobes.filter((item) => item.id != id);
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

  editCategory(id: string) {
    this.router.navigate(['/edit-category'], {
      queryParams: { id: id },
    });
  }
}
