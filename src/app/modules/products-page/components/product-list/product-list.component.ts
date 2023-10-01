import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {selectAvailableProducts} from "../../store/selectors/products-page.selectors";
import {ProductDTO} from "../../dtos/product.dto";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  readonly ngUnsubscribe = new Subject<void>();

  products: ProductDTO[] = []

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.fetchAvailableProducts();
  }

  fetchAvailableProducts() {
    this.store
      .select(selectAvailableProducts)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((products: ProductDTO[]) => this.products = products)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
