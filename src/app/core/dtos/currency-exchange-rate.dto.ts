//Expected apilayer response
export interface CurrencyExchangeRateDto {
  privacy: string;
  quotes: RatesDto;
  source: string;
  success: boolean
  terms: string
  timestamp: number;
}

export interface RatesDto {
  USDCAD: number;
  USDEUR: number;
  USDGBP: number;
  USDPLN: number
}
