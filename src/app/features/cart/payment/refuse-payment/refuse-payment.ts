import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../../../models/cart-item.model';
import { Router } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { map, Observable } from 'rxjs';
import { RestaurantAddressService } from '../../../../services/restaurant-address.service';
import { RestaurantUnit } from '../../../../models/restaurant-models';

@Component({
  selector: 'app-refuse-payment',
  imports: [CurrencyPipe, AsyncPipe],
  templateUrl: './refuse-payment.html',
  styleUrls: ['./refuse-payment.css'],
})
export class RefusePaymentComponent implements OnInit {
  itemsRecusados: ICartItem[] = [];
  totalRefused$!: Observable<number>;
  selectedUnit$!: Observable<RestaurantUnit | null>;

  constructor(
    private router: Router,
    private cartService: CartService,
    private restaurantAddressService: RestaurantAddressService
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state && navigation.extras.state['cartData']) {
      this.itemsRecusados = navigation.extras.state['cartData'];
    }

    this.selectedUnit$ = this.restaurantAddressService.selectedUnit$;
  }

  ngOnInit() {
    this.totalRefused$ = this.cartService.totalValue$.pipe(
      map(totalValue => totalValue)
    );
  }
}
