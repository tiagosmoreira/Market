import {Component, Input} from "@angular/core";
import {ProductDTO} from "../../dtos/product.dto";
import {roundNumber} from "../../../../shared/helpers/math.helper";
import {Store} from "@ngrx/store";
import {
  addProductToCheckoutCart,
  updateQuantity,
  updateTotalPrice
} from "../../../checkout-page/store/actions/checkout-page.actions";
import {Currencies} from "../../../../core/enums/currency.enum";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product?: ProductDTO;
  quantity = 0;
  subTotal = 0;

  constructor(private readonly store: Store) {
  }

  decreaseQuantity() {
    this.quantity = this.quantity - 1;
    this.updateSubTotal();
  }

  increaseQuantity() {
    this.quantity = this.quantity + 1;
    this.updateSubTotal();
  }

  updateSubTotal() {
    this.subTotal = roundNumber((this.product?.pricePer ?? 1) * this.quantity)
  }

  addProductToCheckoutCart(): void {
    this.store.dispatch(addProductToCheckoutCart({
      product: {
        currency: this.product?.currency ?? Currencies.USD,
        productPrice: this.product?.pricePer ?? 0,
        productTitle: this.product?.productTitle ?? '',
        quantity: this.quantity,
        subTotalPrice: this.subTotal,
        img: this.product?.img ?? ''
      }
    }));
    this.store.dispatch(updateTotalPrice());
    this.store.dispatch(updateQuantity());
    this.clearState();
  }

  clearState() {
    this.quantity = 0;
    this.subTotal = 0;
  }
}
