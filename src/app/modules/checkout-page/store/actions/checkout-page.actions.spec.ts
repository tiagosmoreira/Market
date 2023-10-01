import {Currencies} from "../../../../core/enums/currency.enum";
import {
  addProductToCheckoutCart,
  CheckoutPageActions,
  fetchExchangeRates,
  fetchExchangeRatesFailure,
  fetchExchangeRatesSuccess,
  removeProductFromCheckoutCart,
  updateQuantity,
  updateTotalPrice
} from "./checkout-page.actions";
import {CheckoutProductDto} from "../../dtos/checkout-product.dto";
import {RatesDto} from "../../../../core/dtos/currency-exchange-rate.dto";

describe('CheckoutPage Actions', () => {
  const mockProduct: CheckoutProductDto = {
    productTitle: 'testTitle',
    currency: Currencies.USD,
    productPrice: 1,
    quantity: 1,
    subTotalPrice: 1,
    img: 'testImg'
  }

  it('should create AddProductToCheckoutCart action', () => {


    const action = addProductToCheckoutCart({product: mockProduct});

    expect(action).toEqual({
      type: CheckoutPageActions.AddProductToCheckoutCart,
      product: mockProduct
    });
  });

  it('should create RemoveProductFromCheckoutCart action', () => {

    const action = removeProductFromCheckoutCart({product: mockProduct});

    expect(action).toEqual({
      type: CheckoutPageActions.RemoveProductFromCheckoutCart,
      product: mockProduct
    });
  });

  it('should create UpdateCheckoutCartTotalPrice action', () => {
    const action = updateTotalPrice();

    expect(action).toEqual({
      type: CheckoutPageActions.UpdateCheckoutCartTotalPrice,
    });
  });

  it('should create UpdateCheckoutCartQuantity action', () => {
    const action = updateQuantity();

    expect(action).toEqual({
      type: CheckoutPageActions.UpdateCheckoutCartQuantity,
    });
  });

  it('should create FetchExchangeRates action', () => {
    const action = fetchExchangeRates();

    expect(action).toEqual({
      type: CheckoutPageActions.FetchExchangeRates,
    });
  });

  it('should create FetchExchangeRatesSuccess action', () => {
    const mockRates: RatesDto = {
      USDCAD: 1,
      USDEUR: 1,
      USDGBP: 1,
      USDPLN: 1
    }

    const action = fetchExchangeRatesSuccess({rates: mockRates});

    expect(action).toEqual({
      type: CheckoutPageActions.FetchExchangeRatesSuccess,
      rates: mockRates
    });
  });

  it('should create FetchExchangeRatesFailure action', () => {
    const mockErrorMessage = 'error'

    const action = fetchExchangeRatesFailure({errorMessage: mockErrorMessage});

    expect(action).toEqual({
      type: CheckoutPageActions.FetchExchangeRatesFailure,
      errorMessage: mockErrorMessage
    });
  });
});
