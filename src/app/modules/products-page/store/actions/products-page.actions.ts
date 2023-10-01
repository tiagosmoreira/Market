import {createAction, props} from '@ngrx/store';
import {ProductDTO} from "../../dtos/product.dto";

export enum ProductsPageActions {
  LoadAllProducts = 'Load All Available Products',
  LoadAllProductsSuccess = 'Load All Available Products Success',
  LoadAllProductsFailure = 'Load All Available Products Failure'
}

export const fetchAllProducts = createAction(
  ProductsPageActions.LoadAllProducts
);

export const fetchAllProductsSuccess = createAction(
  ProductsPageActions.LoadAllProductsSuccess,
  props<{ products: ProductDTO[] }>()
);

export const fetchAllProductFailure = createAction(
  ProductsPageActions.LoadAllProductsFailure,
  props<{ errorMessage: string }>()
);
