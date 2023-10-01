import * as checkoutPageSelectors from '../selectors/checkout-page.selectors';
import {Currencies} from "../../../../core/enums/currency.enum";
import {CheckoutCartState} from "../reducers/checkout-page.reducers";
import {CheckoutProductDto} from "../../dtos/checkout-product.dto";
import {RatesDto} from "../../../../core/dtos/currency-exchange-rate.dto";

const mockProduct: CheckoutProductDto = {
  productTitle: 'testTitle',
  quantity: 1,
  subTotalPrice: 1,
  productPrice: 1,
  currency: Currencies.USD,
  img: 'testImg'
};

const mockRates: RatesDto = {
  USDCAD: 1,
  USDEUR: 1,
  USDGBP: 1,
  USDPLN: 1
};

const mockInitialState: CheckoutCartState = {
  products: [mockProduct],
  totalPrice: 0,
  currency: Currencies.USD,
  quantityOfProducts: 0,
  rates: mockRates
};

describe('CheckoutPage Selectors', () => {
  it("should return all checkout cart products", () => {

    const result = checkoutPageSelectors.selectCheckoutProducts.projector(mockInitialState);

    expect(result).toEqual([mockProduct])
  });

  it("should return checkout cart total price", () => {

    const result = checkoutPageSelectors.selectCheckoutTotalPrice.projector(mockInitialState);

    expect(result).toEqual(mockInitialState.totalPrice)
  });

  it("should return the total number of products inside of checkout cart", () => {

    const result = checkoutPageSelectors.selectCheckoutTotalProducts.projector(mockInitialState);

    expect(result).toEqual(mockInitialState.quantityOfProducts)
  });

  it("should return the available exchange rates", () => {

    const result = checkoutPageSelectors.selectExchangeRates.projector(mockInitialState);

    expect(result).toEqual(mockInitialState.rates)
  });
});
