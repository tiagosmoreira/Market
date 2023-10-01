import {ProductsService} from "./products.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => expect(service).toBeTruthy());
});
