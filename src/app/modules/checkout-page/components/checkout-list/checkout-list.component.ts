import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectCheckoutProducts} from "../../store/selectors/checkout-page.selectors";
import {Subject, takeUntil} from "rxjs";
import {CheckoutProductDto} from "../../dtos/checkout-product.dto";

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss'],
})
export class CheckoutListComponent implements OnInit, OnDestroy {
  @Output() onRemoveItem = new EventEmitter();
  readonly ngUnsubscribe = new Subject<void>();
  products: CheckoutProductDto[] = [];

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.fetchCheckoutCartProducts();
  }

  fetchCheckoutCartProducts() {
    this.store
      .select(selectCheckoutProducts)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((products: CheckoutProductDto[]) => this.products = products)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
