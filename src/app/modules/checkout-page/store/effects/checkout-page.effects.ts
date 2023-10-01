import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as CheckoutPageActions from '../actions/checkout-page.actions';
import {catchError, map, of, switchMap, tap} from "rxjs";
import {CurrencyService} from "../../../../core/api-services/currency.service";

@Injectable()
export class CheckoutPageEffects {

  fetchCheckoutCartProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CheckoutPageActions.fetchExchangeRates),
      switchMap(() => {
        return this.currencyService.getCurrencyRates().pipe(
          map(response =>
            CheckoutPageActions.fetchExchangeRatesSuccess({
              rates: response.quotes
            })
          ),
          catchError(errorMessage => of(CheckoutPageActions.fetchExchangeRatesFailure(errorMessage)))
        );
      })
    );
  });

  fetchCheckoutCartProductsFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CheckoutPageActions.fetchExchangeRatesFailure),
        tap(error => {
          console.error('Failed to get Exchange Rates Data.', error);
        })
      );
    },
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private currencyService: CurrencyService,
  ) {
  }
}
