import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsComponent } from './admin/admins/admins.component';
import { AllMerchantsComponent } from './admin/all-merchants/all-merchants.component';
import { AllOrdersComponent } from './admin/all-orders/all-orders.component';
import { DiscountComponent } from './admin/discount/discount.component';
import { EditMerchantComponent } from './admin/edit-merchant/edit-merchant.component';
import { MerchantRequsetComponent } from './admin/merchant-requset/merchant-requset.component';
import { MerchantViewComponent } from './admin/merchant-view/merchant-view.component';
import { MerchantsRequsetsComponent } from './admin/merchants-requsets/merchants-requsets.component';
import { OrderViewAdminComponent } from './admin/order-view-admin/order-view-admin.component';
import { PaymentComponent } from './admin/payment/payment.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { UserViewComponent } from './admin/user-view/user-view.component';
import { UsersComponent } from './admin/users/users.component';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { HowToOrderComponent } from './how-to-order/how-to-order.component';
import { JoinUsComponent } from './join-us/join-us.component';
import { LoginComponent } from './login/login.component';
import { AccountInformationComponent } from './merchant/account-information/account-information.component';
import { CategoriesComponent } from './merchant/categories/categories.component';
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
import { TagComponent } from './admin/tag/tag.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UploadPaymentComponent } from './merchant/upload-payment/upload-payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order-view-admin', component: OrderViewAdminComponent },

  { path: 'user-view', component: UserViewComponent },

  { path: 'update-user', component: UpdateUserComponent },

  { path: 'merchant-request', component: MerchantRequsetComponent },

  { path: 'merchants-requests', component: MerchantsRequsetsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'admins', component: AdminsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'all-orders', component: AllOrdersComponent },
  { path: 'edit-merchant', component: EditMerchantComponent },

  { path: 'merchant-view', component: MerchantViewComponent },

  { path: 'all-shops', component: AllShopsComponent },
  { path: 'shop', component: ShopDetailsComponent },

  { path: 'checkout', component: CheckoutComponent },
  { path: 'view-order', component: ViewOrderComponent },
  { path: 'view-product', component: ViewProductComponent },
  { path: 'view-category', component: ViewCategoryComponent },
  { path: 'all-merchants', component: AllMerchantsComponent },

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
  { path: 'tags', component: TagComponent },
  { path: 'upload-payment', component: UploadPaymentComponent },

  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
