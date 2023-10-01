import {ProductsPageComponent} from "./products-page.component";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {fetchAllProducts} from "../../store/actions/products-page.actions";


describe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;
  let mockStore: MockStore;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      declarations: [ProductsPageComponent],
      imports: [],
      providers: [provideMockStore()]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should load all products to store', function () {

    const dispatchSpy = spyOn(mockStore, 'dispatch');

    component.fetchAvailableProducts()
    expect(dispatchSpy).toHaveBeenCalledOnceWith(fetchAllProducts());
  });
});
