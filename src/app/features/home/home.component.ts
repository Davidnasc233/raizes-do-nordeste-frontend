import { Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { FoodMenu } from './food-menu/food-menu';
import { DishCard } from './dish-card/dish-card';
import { RestaurantSelector } from './restaurant-selector/restaurant-selector';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IOrder } from '../../models/order.model';
import { Router } from '@angular/router';
import { PromotionSelect } from "../promotion-select/promotion-select";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, FoodMenu, DishCard, RestaurantSelector, AsyncPipe, PromotionSelect],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  lastOrderItem$!: Observable<IOrder | undefined>;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.lastOrderItem$ = this.cartService.orders$.pipe(
      map((orders) => orders.find((order) => order.status !== 'refused')),
    );
  }

  openOrder() {
    const actualOrders = this.cartService.getLatestOrderByStatus('accepted');

    if (actualOrders) {
      const lastOrder = actualOrders;
      this.router.navigate(['/cart/payment-status'], { state: { lastOrder: lastOrder } });
    }
  }
}
