import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ProductComponent} from "./product.component";
import {
  addProductToCheckoutCart,
  updateQuantity,
  updateTotalPrice
} from "../../../checkout-page/store/actions/checkout-page.actions";
import {Currencies} from "../../../../core/enums/currency.enum";
import {ProductDTO} from "../../dtos/product.dto";


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let mockStore: MockStore;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [],
      providers: [provideMockStore()]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should decrease product quantity by 1', function () {

    const mockQuantity = 2;
    component.quantity = mockQuantity
    const updateSubTotalSpy = spyOn(component, 'updateSubTotal');

    component.decreaseQuantity()

    expect(component.quantity).toBe(mockQuantity - 1);
    expect(updateSubTotalSpy).toHaveBeenCalledTimes(1);
  });

  it('should increase product quantity by 1', function () {

    const mockQuantity = 2;
    component.quantity = mockQuantity
    const updateSubTotalSpy = spyOn(component, 'updateSubTotal');

    component.increaseQuantity()

    expect(component.quantity).toBe(mockQuantity + 1);
    expect(updateSubTotalSpy).toHaveBeenCalledTimes(1);
  });

  it('should update sub total price according to products price per and quantity', function () {
    const mockQuantity = 2;
    const mockProduct: ProductDTO = {
      productTitle: 'testTitle',
      currency: Currencies.USD,
      pricePer: 1,
      unit: 'testUnit',
      img: 'testImg'
    }

    component.quantity = mockQuantity;
    component.product = mockProduct;

    component.updateSubTotal();

    expect(component.subTotal).toBe(mockProduct.pricePer * mockQuantity);
  });

  it('should add product to checkout cart and clear state', function () {
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    const clearStateSpy = spyOn(component, 'clearState');

    component.addProductToCheckoutCart()

    expect(dispatchSpy).toHaveBeenCalledTimes(3);
    expect(dispatchSpy).toHaveBeenCalledWith(addProductToCheckoutCart({
      product: {
        currency: Currencies.USD,
        productPrice: component.product?.pricePer ?? 0,
        productTitle: component.product?.productTitle ?? '',
        quantity: component.quantity,
        subTotalPrice: component.subTotal,
        img: component.product?.img ?? ''
      }
    }));
    expect(dispatchSpy).toHaveBeenCalledWith(updateTotalPrice());
    expect(dispatchSpy).toHaveBeenCalledWith(updateQuantity());
    expect(clearStateSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear state', function () {
    component.quantity = 1;
    component.subTotal = 1

    component.clearState()

    expect(component.quantity).toBe(0);
    expect(component.subTotal).toBe(0);
  });
});
