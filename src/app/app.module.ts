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
import { UserSessionService } from './user-session.service';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApplicationStateService } from './app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';

import { Ng2TelInputModule } from 'ng2-tel-input';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { HomeComponent } from './home/home.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { HowToOrderComponent } from './how-to-order/how-to-order.component';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { ShopCardMainComponent } from './shop-card-main/shop-card-main.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegestrationComponent } from './regestration/regestration.component';
import { PartnerComponent } from './partner/partner.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ChangePasswordComponent } from './my-account/change-password/change-password.component';
import { AddAddressComponent } from './my-account/add-address/add-address.component';
import { OrderDetailsComponent } from './my-account/order-details/order-details.component';
import { CommonModule } from '@angular/common';
import { SavedAddressComponent } from './my-account/saved-address/saved-address.component';
import { SideNavComponent } from './my-account/side-nav/side-nav.component';
import { TopPartComponent } from './my-account/top-part/top-part.component';
import { RateOrderComponent } from './my-account/rate-order/rate-order.component';
import { MyOrdersComponent } from './my-account/my-orders/my-orders.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { AddProduct } from './shop-details/add-product/add-product.component';
import { CheckoutComponent } from './checkout/checkout.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PartnerComponent,
    ShopCardComponent,
    HowToOrderComponent,
    OrderDetailsComponent,
    AllShopsComponent,
    ShopCardMainComponent,
    LoginComponent,
    ForgetPasswordComponent,
    RegestrationComponent,
    MyAccountComponent,
    RateOrderComponent,
    MyOrdersComponent,
    ShopDetailsComponent,
    ChangePasswordComponent,
    AddAddressComponent,
    JoinUsComponent,
    AddProduct,
    SavedAddressComponent,
    SideNavComponent,
    TopPartComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopoverModule,
    BrowserAnimationsModule,
    BrowserModule,
    CarouselModule,

    Ng2CarouselamosModule,
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
    CommonModule,
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
  providers: [ApplicationStateService, UserSessionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
