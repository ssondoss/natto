import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { arabicLetters } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css', '../../../app.component.css'],
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  id: any;
  category: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<EditCategoryComponent>
  ) {
    this.category = data.category;
    this.categoryForm = this.formBuilder.group({
      titleEnglish: [
        this.category.titleEnglish,
        Validators.compose([Validators.required]),
      ],
      titleArabic: [
        this.category.titleArabic,
        Validators.compose([Validators.required, arabicLetters]),
      ],
    });
  }

  updateCategory(valuesForm: FormGroup) {
    if (this.categoryForm.valid) {
      this.http
        .put(environment.apiURL + '/category/' + this.category.id, {
          merchantId: this.category.merchantId,
          titleArabic: valuesForm.controls['titleArabic'].value,
          titleEnglish: valuesForm.controls['titleEnglish'].value,
        })
        .subscribe((res) => {
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
          this.dialogRef.close({ event: 'UPDATED', data: res });
        });
    } else this.categoryForm.markAllAsTouched();
  }
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close({ event: 'CANCELED' });
  }
}
