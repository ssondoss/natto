import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { arabicLetters } from 'src/app/app.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../../app.component.css'],
})
export class ProductsComponent implements OnInit {
  productForm;
  constructor(public formBuilder: FormBuilder) {}

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
      image: [],
    });
  }
  addProduct() {}
  deleteProduct(id) {}
}
