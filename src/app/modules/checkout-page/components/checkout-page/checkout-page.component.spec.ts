import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {CheckoutPageComponent} from "./checkout-page.component";
import {selectCheckoutTotalPrice, selectExchangeRates} from "../../store/selectors/checkout-page.selectors";
import {fetchExchangeRates} from "../../store/actions/checkout-page.actions";
import {RatesDto} from "../../../../core/dtos/currency-exchange-rate.dto";
import {Currencies} from "../../../../core/enums/currency.enum";

describe('CheckoutPageComponent', () => {
  let component: CheckoutPageComponent;
  let fixture: ComponentFixture<CheckoutPageComponent>;
  let mockStore: MockStore;
  let mockRates: RatesDto = {
    USDCAD: 1,
    USDEUR: 2,
    USDGBP: 3,
    USDPLN: 4
  };

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      declarations: [CheckoutPageComponent],
      imports: [],
      providers: [provideMockStore()]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPageComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should fetch checkout total price from store', function () {
    const mockTotal = 2;

    mockStore.overrideSelector(selectCheckoutTotalPrice, mockTotal)


    component.fetchCheckoutTotalPrice()
    expect(component.originalTotal).toEqual(mockTotal);
    expect(component.total).toEqual(mockTotal);
  });

  it('should load exchange rates to store', function () {

    const dispatchSpy = spyOn(mockStore, 'dispatch');

    component.loadExchangeRatesToStore()
    expect(dispatchSpy).toHaveBeenCalledOnceWith(fetchExchangeRates());
  });

  it('should fetch exchange rates from store', function () {
    mockStore.overrideSelector(selectExchangeRates, mockRates)

    component.fetchExchangeRates()
    expect(component.rates).toEqual(mockRates);
  });

  it('should update total value according to rate', function () {
    component.rates = mockRates;
    component.total = 2;
    component.originalTotal = 2;

    Object.values(Currencies).forEach(currency => {
      if (currency !== Currencies.USD) {
        component.updateTotalValue(currency)

        expect(component.total).toBe(component.originalTotal * mockRates[`USD${currency}`]);
        expect(component.selected).toBe(currency);
      } else {
        component.updateTotalValue(Currencies.USD)

        expect(component.total).toBe(component.originalTotal);
        expect(component.selected).toBe(Currencies.USD);
      }
    })
  });
});
