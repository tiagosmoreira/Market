import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {selectCheckoutProducts} from "../../store/selectors/checkout-page.selectors";
import {CheckoutListComponent} from "./checkout-list.component";
import {CheckoutProductDto} from "../../dtos/checkout-product.dto";
import {Currencies} from "../../../../core/enums/currency.enum";

describe('CheckoutListComponent', () => {
  let component: CheckoutListComponent;
  let fixture: ComponentFixture<CheckoutListComponent>;
  let mockStore: MockStore;
  let mockProduct: CheckoutProductDto = {
    productTitle: 'testTitle',
    quantity: 1,
    subTotalPrice: 1,
    productPrice: 1,
    currency: Currencies.USD,
    img: 'testImg'
  };

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      declarations: [CheckoutListComponent],
      imports: [],
      providers: [provideMockStore()]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should fetch checkout cart products from store', function () {
    mockStore.overrideSelector(selectCheckoutProducts, [mockProduct])

    component.fetchCheckoutCartProducts()
    expect(component.products).toEqual([mockProduct]);
  });
});

