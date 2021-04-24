import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { HowToOrderComponent } from './how-to-order/how-to-order.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { LoginComponent } from './login/login.component';
import { AccountInformationComponent } from './merchant/account-information/account-information.component';
import { CategoriesComponent } from './merchant/categories/categories.component';
import { EditCategoryComponent } from './merchant/edit-category/edit-category.component';
import { EditProductComponent } from './merchant/edit-product/edit-product.component';
import { OrdersComponent } from './merchant/orders/orders.component';
import { ProductsComponent } from './merchant/products/products.component';
import { ViewCategoryComponent } from './merchant/view-category/view-category.component';
import { ViewOrderComponent } from './merchant/view-order/view-order.component';
import { ViewProductComponent } from './merchant/view-product/view-product.component';
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
  { path: 'view-order', component: ViewOrderComponent },
  { path: 'view-product', component: ViewProductComponent },
  { path: 'view-category', component: ViewCategoryComponent },
  { path: 'edit-category', component: EditCategoryComponent },

  { path: 'edit-product', component: EditProductComponent },

  { path: 'how-to-order', component: HowToOrderComponent },
  { path: 'regestration', component: RegestrationComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'account-information', component: AccountInformationComponent },
  { path: 'wardrobes', component: CategoriesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },

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
