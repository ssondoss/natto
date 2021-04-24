import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { arabicLetters } from 'src/app/app.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../../app.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryForm;
  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
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

      // imageId: [],
    });
  }
  addWardrobe(values: FormGroup) {}
  deleteWardrobe(id) {}
}
