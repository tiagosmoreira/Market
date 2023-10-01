import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {ProductDTO} from "../../modules/products-page/dtos/product.dto";
import {Currencies} from "../enums/currency.enum";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly availableProductsMock: ProductDTO[] = [
    {
      productTitle: 'Pears',
      pricePer: 95,
      unit: 'bag',
      currency: Currencies.USD,
      img: 'https://usapears.org/wp-content/uploads/2019/11/Ten-Varieties-of-USA-Pears.png'
    },
    {
      productTitle: 'Eggs',
      pricePer: 2.10,
      unit: 'dozen',
      currency: Currencies.USD,
      img: 'https://res.cloudinary.com/ouwp/images/f_auto,q_auto/v1692006554/ouredesign/life/eggs_41047de54b/eggs_41047de54b.png?_i=AA'
    },
    {
      productTitle: 'Milk',
      pricePer: 1.30,
      unit: 'bottle',
      currency: Currencies.USD,
      img: 'https://producersdairy.com/wp-content/uploads/2021/03/WholeMilk_NoGnG.png'
    },
    {
      productTitle: 'Beans',
      pricePer: 73,
      unit: 'can',
      currency: Currencies.USD,
      img: 'https://www.seedway.com/app/uploads/2020/09/Jaguar-1-2021.png'
    }
  ]

  getAllProducts(): Observable<ProductDTO[]> {
    return of(this.availableProductsMock)
  }
}
