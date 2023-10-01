import {Action} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {ProductsPageEffects} from "./products-page.effects";
import {TestBed} from "@angular/core/testing";
import {provideMockStore} from "@ngrx/store/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {Actions} from "@ngrx/effects";
import {ProductsService} from "../../../../core/api-services/products.service";
import {ProductDTO} from "../../dtos/product.dto";
import {Currencies} from "../../../../core/enums/currency.enum";
import {ProductsPageActions} from "../actions/products-page.actions";
import {cold} from "jasmine-marbles";

describe('ProductsPage Effects', () => {

  let actions$: Observable<Action>;
  let effects: ProductsPageEffects;
  let productsService: ProductsService;
  let mockProduct: ProductDTO = {
    productTitle: 'testTitle',
    currency: Currencies.USD,
    pricePer: 1,
    unit: 'testUnit',
    img: 'testImg'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProductsPageEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });
  });

  beforeEach(() => {
    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(ProductsPageEffects);
    productsService = TestBed.inject(ProductsService);

    spyOn(productsService, 'getAllProducts').and.returnValue(
      of([mockProduct])
    );
  });

  it('should create LoadAllProducts effect', () => {
    actions$ = of({type: ProductsPageActions.LoadAllProducts,});
    const result = cold('(--a|)', {
      a: {type: ProductsPageActions.LoadAllProductsSuccess, products: [mockProduct]},
    });
    expect(effects.fetchAvailableProducts$).toBeObservable(result);
  });

  it('should create LoadAllProducts error effect', () => {
    actions$ = of({type: ProductsPageActions.LoadAllProductsFailure,});
    const result = cold('(--a|)', {
      a: {type: ProductsPageActions.LoadAllProductsFailure},
    });
    expect(effects.fetchAvailableProductsFailure$).toBeObservable(result);
  });
})
