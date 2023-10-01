import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductsPageModule} from "./modules/products-page/products-page.module";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import {CheckoutPageModule} from "./modules/checkout-page/checkout-page.module";
import {HomePageModule} from "./modules/home-page/home-page.module";
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsPageModule,
    NoopAnimationsModule,
    SharedModule,
    CheckoutPageModule,
    CoreModule,
    HomePageModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
