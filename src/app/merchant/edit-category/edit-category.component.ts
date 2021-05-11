import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css', '../../app.component.css'],
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  id: any;
  category: any;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public translate: TranslateService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.http
        .get(environment.apiURL + '/category/' + this.id)
        .subscribe((data: any) => {
          this.category = data;
          this.categoryForm = this.formBuilder.group({
            titleEnglish: [
              data.titleEnglish,
              Validators.compose([
                Validators.required,
                Validators.maxLength(99),
              ]),
            ],
            titleArabic: [
              data.titleArabic,
              Validators.compose([
                Validators.required,
                Validators.maxLength(99),
              ]),
            ],
          });
        });
    });
  }

  updateCategory(valuesForm: FormGroup) {
    if (this.categoryForm.valid) {
      this.http
        .put(environment.apiURL + '/category/' + this.id, {
          merchantId: this.category.merchantId,
          titleArabic: valuesForm.controls['titleArabic'].value,
          titleEnglish: valuesForm.controls['titleEnglish'].value,
        })
        .subscribe(() => {
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
    } else this.categoryForm.markAllAsTouched();
  }
  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      titleEnglish: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(99)]),
      ],
      titleArabic: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(99)]),
      ],
    });
  }
}
