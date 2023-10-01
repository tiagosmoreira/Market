import {Action} from "@ngrx/store";
import {initialState, reducers} from "./products-page.reducers";
import * as productsPageActions from '../actions/products-page.actions';
import {ProductDTO} from "../../dtos/product.dto";
import {Currencies} from "../../../../core/enums/currency.enum";

describe('ProductsPage Reducers', () => {

  const mockProduct: ProductDTO = {
    productTitle: 'testTitle',
    currency: Currencies.USD,
    pricePer: 1,
    unit: 'testUnit',
    img: 'testImg'
  }

  it('should return the default state', () => {
    const action: Action = {
      type: 'Unknown',
    };
    const state = reducers(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should reduce fetchAllProductsSuccess action', () => {
    const action = productsPageActions.fetchAllProductsSuccess({
      products: [mockProduct]
    });
    const state = reducers(initialState, action);

    expect(state.products).toEqual([mockProduct]);
  });
});
