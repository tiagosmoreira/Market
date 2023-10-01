import * as productsPageSelectors from '../selectors/products-page.selectors';
import {ProductsPageState} from "../reducers/products-page.reducers";
import {ProductDTO} from "../../dtos/product.dto";
import {Currencies} from "../../../../core/enums/currency.enum";

const mockProduct: ProductDTO = {
  productTitle: 'testTitle',
  currency: Currencies.USD,
  pricePer: 1,
  unit: 'testUnit',
  img: 'testImg'
}

const mockInitialState: ProductsPageState = {
  products: [mockProduct]
}

describe('ProductsPage Selectors', () => {
  it("should return all available products", () => {

    const result = productsPageSelectors.selectAvailableProducts.projector(mockInitialState);

    expect(result).toEqual([mockProduct])
  });
});
