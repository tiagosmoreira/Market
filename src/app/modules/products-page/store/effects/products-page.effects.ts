import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductsService} from "../../../../core/api-services/products.service";
import * as ProductsPageActions from '../actions/products-page.actions';
import {catchError, map, of, switchMap, tap} from "rxjs";

@Injectable()
export class ProductsPageEffects {
  fetchAvailableProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsPageActions.fetchAllProducts),
      switchMap(() => {
        return this.productsService.getAllProducts().pipe(
          map(response =>
            ProductsPageActions.fetchAllProductsSuccess({
              products: response
            })
          ),
          catchError(errorMessage => of(ProductsPageActions.fetchAllProductFailure({
            errorMessage
          })))
        );
      })
    );
  });

  fetchAvailableProductsFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductsPageActions.fetchAllProductFailure),
        tap(error => {
          console.error('Failed to get the available products.', error);
        })
      );
    },
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
  ) {
  }
}
