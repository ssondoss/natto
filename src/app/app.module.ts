import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PopoverModule } from 'ngx-smart-popover';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbRatingConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApplicationStateService } from './app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { HomeComponent } from './home/home.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { HowToOrderComponent } from './how-to-order/how-to-order.component';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { ShopCardMainComponent } from './shop-card-main/shop-card-main.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { MaterialModule } from './material.module';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ShopCardComponent,
    HowToOrderComponent,
    AllShopsComponent,
    ShopCardMainComponent,
    ShopDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopoverModule,
    HttpClientModule,
    MaterialModule,

    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    Ng2TelInputModule,
    FormsModule,

    DialogModule,

    PopoverModule,
    ReactiveFormsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    NgbModule,
  ],
  providers: [ApplicationStateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
