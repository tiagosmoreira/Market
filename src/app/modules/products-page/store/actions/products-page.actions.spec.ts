import {
  fetchAllProductFailure,
  fetchAllProducts,
  fetchAllProductsSuccess,
  ProductsPageActions
} from "./products-page.actions";
import {Currencies} from "../../../../core/enums/currency.enum";
import {ProductDTO} from "../../dtos/product.dto";

describe('ProductsPage Actions', () => {

  it('should create LoadAllProducts action', () => {
    const action = fetchAllProducts();

    expect(action).toEqual({
      type: ProductsPageActions.LoadAllProducts,
    });
  });

  it('should create LoadAllProductsSuccess action', () => {

    const mockProductsList: ProductDTO[] = [{
      productTitle: 'testTittle',
      currency: Currencies.USD,
      pricePer: 2,
      unit: 'testUnit',
      img: 'testImg'
    }]

    const action = fetchAllProductsSuccess({products: mockProductsList});

    expect(action).toEqual({
      type: ProductsPageActions.LoadAllProductsSuccess,
      products: mockProductsList
    });
  });

  it('should create LoadAllProductsFailure action', () => {
    const mockErrorMessage = 'error'
    const action = fetchAllProductFailure({errorMessage: mockErrorMessage});

    expect(action).toEqual({
      type: ProductsPageActions.LoadAllProductsFailure,
      errorMessage: mockErrorMessage
    });
  });
});
