import {ToolbarComponent} from "./toolbar.component";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {selectCheckoutTotalProducts} from "../../../modules/checkout-page/store/selectors/checkout-page.selectors";


describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let router: Router;
  let mockStore: MockStore;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [provideMockStore()]
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should call navigate', function () {
    const testRoute = 'testRoute'
    const spy = spyOn(router, 'navigate');

    component.navigate(testRoute);
    expect(spy).toHaveBeenCalledWith([`/${testRoute}`]);
  });

  it('should update total value according to store', function () {

    const mockTotal = 2;

    mockStore.overrideSelector(selectCheckoutTotalProducts, mockTotal)

    component.fetchCheckoutTotalProducts()
    expect(component.totalProducts).toEqual(mockTotal);
  });
});
