import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutPageComponent} from "./modules/checkout-page/components/checkout-page/checkout-page.component";
import {ProductsPageComponent} from "./modules/products-page/components/products-page/products-page.component";
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";
import {HomePageComponent} from "./modules/home-page/components/home-page/home-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'products', component: ProductsPageComponent},
  {path: 'checkout', component: CheckoutPageComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
