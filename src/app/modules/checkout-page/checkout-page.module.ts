import {NgModule} from '@angular/core';
import {CheckoutPageComponent} from "./components/checkout-page/checkout-page.component";
import {CheckoutItemComponent} from "./components/checkout-item/checkout-item.component";
import {CheckoutListComponent} from "./components/checkout-list/checkout-list.component";
import {CheckoutPageStoreModule} from "./store/checkout-page-store.module";
import {NgForOf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    CheckoutPageComponent,
    CheckoutItemComponent,
    CheckoutListComponent
  ],
  imports: [
    CheckoutPageStoreModule,
    NgForOf,
    MatCardModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [],
  exports: [
    CheckoutPageComponent
  ],
  bootstrap: []
})
export class CheckoutPageModule {
}
