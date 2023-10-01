import {Currencies} from "../../../core/enums/currency.enum";

export interface ProductDTO {
  productTitle: string;
  pricePer: number;
  unit: string;
  currency: Currencies;
  img: string;
}
