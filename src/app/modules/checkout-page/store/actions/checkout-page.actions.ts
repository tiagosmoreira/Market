import {createAction, props} from '@ngrx/store';
import {CheckoutProductDto} from "../../dtos/checkout-product.dto";
import {RatesDto} from "../../../../core/dtos/currency-exchange-rate.dto";

export enum CheckoutPageActions {
  AddProductToCheckoutCart = 'Add Product To Checkout Cart',

  RemoveProductFromCheckoutCart = 'Remove Product From Checkout Cart',

  UpdateCheckoutCartTotalPrice = 'Update Checkout Cart Total Price',

  UpdateCheckoutCartQuantity = 'Update Checkout Cart Quantity',

  FetchExchangeRates = 'Fetch Exchange Rates',
  FetchExchangeRatesSuccess = 'Fetch Exchange Rates Success',
  FetchExchangeRatesFailure = 'Fetch Exchange Rates Failure'

}

export const addProductToCheckoutCart = createAction(
  CheckoutPageActions.AddProductToCheckoutCart,
  props<{ product: CheckoutProductDto }>()
);

export const removeProductFromCheckoutCart = createAction(
  CheckoutPageActions.RemoveProductFromCheckoutCart,
  props<{ product: CheckoutProductDto }>()
);

export const updateTotalPrice = createAction(
  CheckoutPageActions.UpdateCheckoutCartTotalPrice
);

export const updateQuantity = createAction(
  CheckoutPageActions.UpdateCheckoutCartQuantity
);

export const fetchExchangeRates = createAction(
  CheckoutPageActions.FetchExchangeRates
);

export const fetchExchangeRatesSuccess = createAction(
  CheckoutPageActions.FetchExchangeRatesSuccess,
  props<{ rates: RatesDto }>()
);

export const fetchExchangeRatesFailure = createAction(
  CheckoutPageActions.FetchExchangeRatesFailure,
  props<{ errorMessage: string }>()
);
