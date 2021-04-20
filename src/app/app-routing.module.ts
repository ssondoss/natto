import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { HowToOrderComponent } from './how-to-order/how-to-order.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { LoginComponent } from './login/login.component';
import { AddAddressComponent } from './my-account/add-address/add-address.component';
import { ChangePasswordComponent } from './my-account/change-password/change-password.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyOrdersComponent } from './my-account/my-orders/my-orders.component';
import { SavedAddressComponent } from './my-account/saved-address/saved-address.component';
import { PartnerComponent } from './partner/partner.component';
import { RegestrationComponent } from './regestration/regestration.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-shops', component: AllShopsComponent },
  { path: 'shop', component: ShopDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },

  { path: 'how-to-order', component: HowToOrderComponent },
  { path: 'regestration', component: RegestrationComponent },
  { path: 'my-account', component: MyAccountComponent },

  { path: 'login', component: LoginComponent },
  { path: 'partner', component: PartnerComponent },
  { path: 'saved-address', component: SavedAddressComponent },
  { path: 'join-us', component: JoinUsComponent },
  { path: 'change-password', component: ChangePasswordComponent },

  { path: 'my-orders', component: MyOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
