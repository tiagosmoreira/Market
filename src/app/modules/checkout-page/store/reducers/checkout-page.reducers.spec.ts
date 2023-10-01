import {Action} from "@ngrx/store";
import * as checkoutPageActions from '../actions/checkout-page.actions';
import {Currencies} from "../../../../core/enums/currency.enum";
import {CheckoutProductDto} from "../../dtos/checkout-product.dto";
import {initialState, reducers} from "./checkout-page.reducers";

describe('CheckoutPage Reducers', () => {

  const mockCheckoutProduct: CheckoutProductDto = {
    productTitle: 'testTitle',
    quantity: 1,
    subTotalPrice: 1,
    productPrice: 1,
    currency: Currencies.USD,
    img: 'testImg'
  };

  const mockRates = {
    USDCAD: 1,
    USDPLN: 1,
    USDGBP: 1,
    USDEUR: 1
  }

  it('should return the default state', () => {
    const action: Action = {
      type: 'Unknown',
    };
    const state = reducers(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should reduce addProductToCheckoutCart action', () => {
    const action = checkoutPageActions.addProductToCheckoutCart({
      product: mockCheckoutProduct
    });
    const state = reducers(initialState, action);

    expect(state.products).toEqual([mockCheckoutProduct]);
  });

  it('should reduce removeProductFromCheckoutCart action', () => {
    const addAction = checkoutPageActions.addProductToCheckoutCart({
      product: mockCheckoutProduct
    });
    const addState = reducers(initialState, addAction);

    expect(addState.products).toEqual([mockCheckoutProduct]);


    const action = checkoutPageActions.removeProductFromCheckoutCart({
      product: mockCheckoutProduct
    });
    const finalState = reducers(addState, action);

    expect(finalState.products).toEqual([]);
  });

  it('should reduce updateTotalPrice action', () => {
    const add1Action = checkoutPageActions.addProductToCheckoutCart({
      product: mockCheckoutProduct
    });
    const add1State = reducers(initialState, add1Action);

    expect(add1State.totalPrice).toEqual(initialState.totalPrice);


    const add2Action = checkoutPageActions.addProductToCheckoutCart({
      product: mockCheckoutProduct
    });
    const add2State = reducers(add1State, add2Action);

    expect(add2State.totalPrice).toEqual(initialState.totalPrice);


    const action = checkoutPageActions.updateTotalPrice();
    const finalState = reducers(add2State, action);

    expect(finalState.totalPrice).toEqual(mockCheckoutProduct.subTotalPrice + mockCheckoutProduct.subTotalPrice);
  });

  it('should reduce updateQuantity action', () => {
    const add1Action = checkoutPageActions.addProductToCheckoutCart({
      product: mockCheckoutProduct
    });
    const add1State = reducers(initialState, add1Action);

    expect(add1State.quantityOfProducts).toEqual(initialState.quantityOfProducts);


    const add2Action = checkoutPageActions.addProductToCheckoutCart({
      product: mockCheckoutProduct
    });
    const add2State = reducers(add1State, add2Action);

    expect(add2State.quantityOfProducts).toEqual(initialState.quantityOfProducts);


    const action = checkoutPageActions.updateQuantity();
    const finalState = reducers(add2State, action);

    expect(finalState.quantityOfProducts).toEqual(mockCheckoutProduct.quantity + mockCheckoutProduct.quantity);
  });

  it('should reduce fetchExchangeRatesSuccess action', () => {
    const action = checkoutPageActions.fetchExchangeRatesSuccess({
      rates: mockRates
    });
    const state = reducers(initialState, action);

    expect(state.rates).toEqual(mockRates);
  });
});
