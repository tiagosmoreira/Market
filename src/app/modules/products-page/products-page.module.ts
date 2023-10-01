import {NgModule} from '@angular/core';
import {ProductComponent} from "./components/product/product.component";
import {ProductsPageComponent} from "./components/products-page/products-page.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductsPageStoreModule} from "./store/products-page-store.module";
import {NgForOf} from "@angular/common";

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductsPageComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ProductsPageStoreModule,
    NgForOf
  ],
  providers: [],
  exports: [
    ProductListComponent,
    ProductsPageComponent
  ],
  bootstrap: []
})
export class ProductsPageModule {
}
