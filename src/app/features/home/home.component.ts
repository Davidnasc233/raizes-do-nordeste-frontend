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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, FoodMenu, DishCard, RestaurantSelector, AsyncPipe],
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
      map((orders) => (orders.length > 0 ? orders[0] : undefined)),
    );
    
  }

  openOrder() {
    const actualOrders = (this.cartService as any).ordersSubject.getValue();

    if (actualOrders && actualOrders.length > 0) {
      const lastOrder = actualOrders[0];
      this.router.navigate(['/cart/payment-status'], { state: { lastOrder: lastOrder } });
    }
  }
}
