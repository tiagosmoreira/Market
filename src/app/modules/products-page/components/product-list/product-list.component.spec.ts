import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ProductListComponent} from "./product-list.component";
import {selectAvailableProducts} from "../../store/selectors/products-page.selectors";
import {ProductDTO} from "../../dtos/product.dto";
import {Currencies} from "../../../../core/enums/currency.enum";

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockStore: MockStore;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [],
      providers: [provideMockStore()]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should update available products according to store', function () {

    const mockProducts: ProductDTO[] = [{
      productTitle: 'testTitle',
      unit: 'testUnit',
      pricePer: 1,
      currency: Currencies.USD,
      img: 'testImg'
    }];

    mockStore.overrideSelector(selectAvailableProducts, mockProducts)

    component.fetchAvailableProducts()
    expect(component.products).toEqual(mockProducts);
  });
});
