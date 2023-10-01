import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {featureKey, reducers} from "./reducers/checkout-page.reducers";
import {EffectsModule} from "@ngrx/effects";
import {effects} from "./index";

@NgModule({
  imports: [StoreModule.forFeature(featureKey, reducers), EffectsModule.forFeature(effects)],
})
export class CheckoutPageStoreModule {
}
