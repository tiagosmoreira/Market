import {CheckoutCartState, featureKey} from "../reducers/checkout-page.reducers";
import {createFeatureSelector, createSelector} from "@ngrx/store";

const selectCheckoutCartState = createFeatureSelector<CheckoutCartState>(featureKey);

export const selectCheckoutProducts = createSelector(
  selectCheckoutCartState,
  state => state.products
);

export const selectCheckoutTotalPrice = createSelector(
  selectCheckoutCartState,
  state => state.totalPrice
);

export const selectCheckoutTotalProducts = createSelector(
  selectCheckoutCartState,
  state => state.quantityOfProducts
);

export const selectExchangeRates = createSelector(
  selectCheckoutCartState,
  state => state.rates
);
