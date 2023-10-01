import {createReducer, on} from "@ngrx/store";
import * as ProductsPageActions from '../actions/products-page.actions';
import {ProductDTO} from "../../dtos/product.dto";


export const featureKey = 'productsPage';

export interface ProductsPageState {
  products: ProductDTO[];
}

export const initialState: ProductsPageState = {
  products: []
};

export const reducers = createReducer<ProductsPageState>(
  initialState,

  on(
    ProductsPageActions.fetchAllProductsSuccess,
    (state, {products}): ProductsPageState => ({
      ...state,
      products: products,
    })
  )
);
