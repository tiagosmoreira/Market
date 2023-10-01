import {CheckoutProductDto} from "../../dtos/checkout-product.dto";
import {createReducer, on} from "@ngrx/store";
import * as CheckoutPageActions from '../actions/checkout-page.actions';
import {roundNumber} from "../../../../shared/helpers/math.helper";
import {RatesDto} from "../../../../core/dtos/currency-exchange-rate.dto";
import {Currencies} from "../../../../core/enums/currency.enum";


export const featureKey = 'checkoutCart';

export interface CheckoutCartState {
  products: CheckoutProductDto[];
  totalPrice: number;
  quantityOfProducts: number;
  currency: Currencies;
  rates: RatesDto;
}

export const initialState: CheckoutCartState = {
  products: [],
  totalPrice: 0,
  currency: Currencies.USD,
  quantityOfProducts: 0,
  rates: {
    USDCAD: 1,
    USDEUR: 1,
    USDGBP: 1,
    USDPLN: 1
  }
};

export const reducers = createReducer<CheckoutCartState>(
  initialState,

  on(
    CheckoutPageActions.addProductToCheckoutCart,
    (state, {product}): CheckoutCartState => ({
      ...state,
      products: checkForDuplicatedProducts(state.products, product),
    })
  ),
  on(
    CheckoutPageActions.removeProductFromCheckoutCart,
    (state, {product}): CheckoutCartState => ({
      ...state,
      products: removeProductFromState(state.products, product),
    })
  ),
  on(
    CheckoutPageActions.updateTotalPrice,
    (state): CheckoutCartState => ({
      ...state,
      totalPrice: updateTotalPrice(state.products)
    })
  ),
  on(
    CheckoutPageActions.updateQuantity,
    (state,): CheckoutCartState => ({
      ...state,
      quantityOfProducts: updateQuantity(state.products),
    })
  ),
  on(
    CheckoutPageActions.fetchExchangeRatesSuccess,
    (state, {rates}): CheckoutCartState => ({
      ...state,
      rates: rates
    })
  ),
);

function updateQuantity(stateProducts: CheckoutProductDto[]) {
  let quantity = 0;

  stateProducts.forEach((stateProduct) => {
    quantity = quantity + stateProduct.quantity;
  })
  return quantity;
}

function updateTotalPrice(stateProducts: CheckoutProductDto[]) {
  let totalPrice = 0;

  stateProducts.forEach((stateProduct) => {
    totalPrice = totalPrice + stateProduct.subTotalPrice;
  })
  return totalPrice;
}

function removeProductFromState(stateProducts: CheckoutProductDto[], productToRemove: CheckoutProductDto) {
  let checkoutProducts = [...stateProducts];

  stateProducts.forEach((stateProduct, index) => {
    if (stateProduct.productTitle === productToRemove.productTitle) {
      checkoutProducts.splice(index, 1);
    }
  })
  return checkoutProducts;
}

function checkForDuplicatedProducts(stateProducts: CheckoutProductDto[], productToBeAdded: CheckoutProductDto): CheckoutProductDto[] {
  let checkoutProducts = [...stateProducts];
  let newProductFlag = false;
  checkoutProducts.forEach((checkoutProduct, index) => {
    if (checkoutProduct.productTitle === productToBeAdded.productTitle) {

      checkoutProducts[index] = {
        productTitle: productToBeAdded.productTitle,
        productPrice: productToBeAdded.productPrice,
        quantity: checkoutProduct.quantity + productToBeAdded.quantity,
        subTotalPrice: roundNumber(checkoutProduct.subTotalPrice + productToBeAdded.subTotalPrice),
        currency: checkoutProduct.currency,
        img: checkoutProduct.img
      };
      newProductFlag = true;
    }
  })

  if (!newProductFlag) {
    return [...checkoutProducts, productToBeAdded];
  }

  return checkoutProducts;
}
