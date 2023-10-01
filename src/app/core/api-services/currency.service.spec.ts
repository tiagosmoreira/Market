import {TestBed} from "@angular/core/testing";
import {CurrencyService} from "./currency.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => expect(service).toBeTruthy());
});
