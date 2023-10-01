import {featureKey, ProductsPageState} from "../reducers/products-page.reducers";
import {createFeatureSelector, createSelector} from "@ngrx/store";

const selectProductsPageState = createFeatureSelector<ProductsPageState>(featureKey);

export const selectAvailableProducts = createSelector(
  selectProductsPageState,
  state => state.products
);
