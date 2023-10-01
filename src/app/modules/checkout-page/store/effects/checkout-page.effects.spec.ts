import {Action} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {provideMockStore} from "@ngrx/store/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {Actions} from "@ngrx/effects";
import {cold} from "jasmine-marbles";
import {CheckoutPageEffects} from "./checkout-page.effects";
import {CurrencyService} from "../../../../core/api-services/currency.service";
import {CurrencyExchangeRateDto, RatesDto} from "../../../../core/dtos/currency-exchange-rate.dto";
import {CheckoutPageActions} from "../actions/checkout-page.actions";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CheckoutPage Effects', () => {

  let actions$: Observable<Action>;
  let effects: CheckoutPageEffects;
  let currencyService: CurrencyService;
  let mockRates: RatesDto = {
    USDCAD: 1,
    USDEUR: 1,
    USDGBP: 1,
    USDPLN: 1
  }
  let mockCurrencyServiceResponse: CurrencyExchangeRateDto = {
    privacy: 'testPrivacy',
    quotes: mockRates,
    source: 'testSource',
    success: true,
    terms: 'testTerms',
    timestamp: 0
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CheckoutPageEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
  });

  beforeEach(() => {
    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(CheckoutPageEffects);
    currencyService = TestBed.inject(CurrencyService);

    spyOn(currencyService, 'getCurrencyRates').and.returnValue(
      of(mockCurrencyServiceResponse)
    );
  });

  it('should create FetchExchangeRates effect', () => {
    actions$ = of({type: CheckoutPageActions.FetchExchangeRates,});
    const result = cold('(--a|)', {
      a: {type: CheckoutPageActions.FetchExchangeRatesSuccess, rates: mockRates},
    });
    expect(effects.fetchCheckoutCartProducts$).toBeObservable(result);
  });


  it('should create FetchExchangeRates error effect', () => {
    actions$ = of({type: CheckoutPageActions.FetchExchangeRatesFailure,});
    const result = cold('(--a|)', {
      a: {type: CheckoutPageActions.FetchExchangeRatesFailure},
    });
    expect(effects.fetchCheckoutCartProductsFailure$).toBeObservable(result);
  });
})
