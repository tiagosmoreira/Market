import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {CheckoutItemComponent} from "./checkout-item.component";
import {
  removeProductFromCheckoutCart,
  updateQuantity,
  updateTotalPrice
} from "../../store/actions/checkout-page.actions";
import {CheckoutProductDto} from "../../dtos/checkout-product.dto";
import {Currencies} from "../../../../core/enums/currency.enum";

describe('CheckoutItemComponent', () => {
  let component: CheckoutItemComponent;
  let fixture: ComponentFixture<CheckoutItemComponent>;
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
      declarations: [CheckoutItemComponent],
      imports: [],
      providers: [provideMockStore()]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutItemComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    component.checkoutProduct = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should remove a given product from store', function () {

    const dispatchSpy = spyOn(mockStore, 'dispatch');

    component.removeProductFromCheckoutCart()
    expect(dispatchSpy).toHaveBeenCalledTimes(3);
    expect(dispatchSpy).toHaveBeenCalledWith(removeProductFromCheckoutCart({product: mockProduct}));
    expect(dispatchSpy).toHaveBeenCalledWith(updateTotalPrice());
    expect(dispatchSpy).toHaveBeenCalledWith(updateQuantity());
  });
});
