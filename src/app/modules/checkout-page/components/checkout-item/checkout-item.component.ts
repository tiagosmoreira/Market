import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CheckoutProductDto} from "../../dtos/checkout-product.dto";
import {Store} from "@ngrx/store";
import {
  removeProductFromCheckoutCart,
  updateQuantity,
  updateTotalPrice
} from "../../store/actions/checkout-page.actions";

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss'],
})
export class CheckoutItemComponent {
  @Input() checkoutProduct!: CheckoutProductDto;
  @Output() onRemove = new EventEmitter();

  constructor(private readonly store: Store) {
  }

  removeProductFromCheckoutCart(): void {
    this.store.dispatch(removeProductFromCheckoutCart({
      product: this.checkoutProduct
    }));
    this.store.dispatch(updateTotalPrice());
    this.store.dispatch(updateQuantity());
    this.onRemove.emit()
  }
}
