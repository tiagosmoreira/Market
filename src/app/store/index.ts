import {InjectionToken} from "@angular/core";
import {ActionReducerMap} from "@ngrx/store";
import * as fromCheckout from '../modules/checkout-page/store/reducers/checkout-page.reducers';
import * as fromProductsPage from '../modules/products-page/store/reducers/products-page.reducers';

export interface RootState {
  [fromCheckout.featureKey]: fromCheckout.CheckoutCartState;
}

export const reducers = new InjectionToken<ActionReducerMap<RootState>>('root', {
  factory: () => ({
    [fromCheckout.featureKey]: fromCheckout.reducers,
    [fromProductsPage.featureKey]: fromProductsPage.reducers,
  }),
});
