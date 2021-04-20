import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { ApplicationStateService } from './app.service';
export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}
export function arabicLetters(control: FormControl): { [key: string]: any } {
  var arabicRegexp = /^[\u0621-\u064A\u0660-\u0669\u0020\#\.\+\,\?\^\$\(\)\[\]\{\}\|\@\%\&\!\=\*\^\~\÷\_\"\'\>\<\?]+$/;
  if (control.value && !arabicRegexp.test(control.value)) {
    return { invalidLetters: true };
  }
}
export function matchingPasswords(
  passwordKey: string,
  passwordConfirmationKey: string
) {
  return (group: FormGroup) => {
    let password = group.controls[passwordKey];
    let passwordConfirmation = group.controls[passwordConfirmationKey];
    if (password.value !== passwordConfirmation.value) {
      return passwordConfirmation.setErrors({ mismatchedPasswords: true });
    }
  };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    appService: ApplicationStateService,
    public http: HttpClient,

    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}
  title = 'new-bazzar';

  changeLanguage(lang: string) {
    let htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.changeCssFile(lang);
  }
  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName(
      'head'
    )[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById(
      'langCss'
    ) as HTMLLinkElement;

    let bundleName = lang === 'ar' ? 'arabicStyle.css' : 'englishStyle.css';

    if (existingLink) {
      existingLink.href = bundleName;
    } else {
      let newLink = this.document.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.type = 'text/css';
      newLink.id = 'langCss';
      newLink.href = bundleName;
      headTag.appendChild(newLink);
    }
  }
}
