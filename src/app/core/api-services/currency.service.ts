import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CurrencyExchangeRateDto} from "../dtos/currency-exchange-rate.dto";

@Injectable({
  providedIn: 'root',
})

export class CurrencyService {

  private readonly currencyExchangeRateUrl = environment.settings.exchangeRateUrl;
  private readonly accessKey = environment.settings.accessKey;

  constructor(private readonly http: HttpClient) {
  }

  getCurrencyRates(): Observable<CurrencyExchangeRateDto> {
    return this.http.get<CurrencyExchangeRateDto>(`${this.currencyExchangeRateUrl}?access_key=${this.accessKey}&currencies=EUR,GBP,CAD,PLN&source=USD&format=1`);
  }
}
