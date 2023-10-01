import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {selectCheckoutTotalProducts} from "../../../modules/checkout-page/store/selectors/checkout-page.selectors";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {

  readonly ngUnsubscribe = new Subject<void>();
  totalProducts = 0;

  constructor(private router: Router, private store: Store) {
  }

  ngOnInit() {
    this.fetchCheckoutTotalProducts();
  }

  navigate(to: string) {
    this.router.navigate([`/${to}`])
  }

  fetchCheckoutTotalProducts() {
    this.store
      .select(selectCheckoutTotalProducts)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((total: number) => this.totalProducts = total)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

