import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject, take, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {selectCheckoutTotalPrice, selectExchangeRates} from "../../store/selectors/checkout-page.selectors";
import {fetchExchangeRates} from "../../store/actions/checkout-page.actions";
import {RatesDto} from "../../../../core/dtos/currency-exchange-rate.dto";
import {roundNumber} from "../../../../shared/helpers/math.helper";
import {Currencies} from "../../../../core/enums/currency.enum";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  readonly ngUnsubscribe = new Subject<void>();

  originalTotal = 0;
  total = 0;
  rates: RatesDto = {
    USDCAD: 1,
    USDEUR: 1,
    USDGBP: 1,
    USDPLN: 1
  }
  currencies = [Currencies.USD, Currencies.CAD, Currencies.EUR, Currencies.GBP, Currencies.PLN]
  selected = Currencies.USD;

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.fetchCheckoutTotalPrice();
    this.loadExchangeRatesToStore();
    this.fetchExchangeRates();
  }

  fetchCheckoutTotalPrice() {
    this.store
      .select(selectCheckoutTotalPrice)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((total: number) => {
        this.originalTotal = total;
        this.total = total
      })
  }

  loadExchangeRatesToStore() {
    this.store.dispatch(fetchExchangeRates());
  }

  fetchExchangeRates() {
    this.store
      .select(selectExchangeRates)
      .pipe(take(1))
      .subscribe((rates: RatesDto) => this.rates = rates)
  }

  //Method that updates the total price according to the currency
  updateTotalValue(currency: Currencies) {
    switch (currency) {
      case Currencies.PLN:
        this.total = roundNumber(this.originalTotal * this.rates.USDPLN);
        this.selected = Currencies.PLN;
        return;
      case Currencies.GBP:
        this.total = roundNumber(this.originalTotal * this.rates.USDGBP);
        this.selected = Currencies.GBP;
        return;
      case Currencies.EUR:
        this.total = roundNumber(this.originalTotal * this.rates.USDEUR);
        this.selected = Currencies.EUR;
        return;
      case Currencies.CAD:
        this.total = roundNumber(this.originalTotal * this.rates.USDCAD);
        this.selected = Currencies.CAD;
        return;
      default:
        this.total = this.originalTotal;
        this.selected = Currencies.USD;
        return;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
