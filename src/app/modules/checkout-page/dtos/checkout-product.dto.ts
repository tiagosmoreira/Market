import {Currencies} from "../../../core/enums/currency.enum";

export interface CheckoutProductDto {
  productTitle: string;
  currency: Currencies;
  quantity: number;
  productPrice: number;
  subTotalPrice: number;
  img: string;
}
