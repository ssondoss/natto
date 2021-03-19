import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, HostListener, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ApplicationStateService {
  public isMobileResolution: boolean;
  lang = 'en';

  constructor(
    public http: HttpClient,
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (localStorage.getItem('BAZZAR_PREFERED_LANGUAGE') != null) {
      this.lang = localStorage.getItem('BAZZAR_PREFERED_LANGUAGE');
      this.changeCssFile(this.lang);
    }
    translate.setDefaultLang(this.lang);
    this.changeCssFile(this.lang);
    translate.addLangs(['en', 'ar']);
    if (window.innerWidth < 769) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }

  public changeToArabic() {
    this.translate.use('ar');
    this.lang = 'ar';
  }

  changeLanguage() {
    if (this.lang == 'ar') {
      this.lang = 'en';
      localStorage.setItem('BAZZAR_PREFERED_LANGUAGE', this.lang);
    } else {
      this.lang = 'ar';
      localStorage.setItem('BAZZAR_PREFERED_LANGUAGE', this.lang);
    }
    let htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    //htmlTag.dir = this.lang === "ar" ? "rtl" : "ltr";
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.changeCssFile(this.lang);
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
