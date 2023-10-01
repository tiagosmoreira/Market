import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {fetchAllProducts} from "../../store/actions/products-page.actions";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.fetchAvailableProducts();
  }

  fetchAvailableProducts() {
    this.store.dispatch(fetchAllProducts());
  }
}
