import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllShopsComponent } from './all-shops/all-shops.component';
import { HomeComponent } from './home/home.component';
import { HowToOrderComponent } from './how-to-order/how-to-order.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-shops', component: AllShopsComponent },
  { path: 'shop', component: ShopDetailsComponent },

  { path: 'how-to-order', component: HowToOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
