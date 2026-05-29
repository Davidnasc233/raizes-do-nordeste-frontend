import { Component, OnInit } from '@angular/core';
import { NoItemCart } from './no-item-cart/no-item-cart';
import { CartItems } from './cart-items/cart-items';
import { Payment } from './payment/payment';
import { Observable } from 'rxjs';
import { ICartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { IRestaurantUnit } from '../../models/restaurant-models';
import { RestaurantAddressService } from '../../services/restaurant-address.service';

@Component({
  selector: 'app-cart',
  imports: [NoItemCart, CartItems, Payment, AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems$!: Observable<ICartItem[]>;
  selectedUnit$!: Observable<IRestaurantUnit | null>;

  constructor(
    public cartService: CartService,
    private restaurantAddressService: RestaurantAddressService,
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.items$;
    this.selectedUnit$ = this.restaurantAddressService.selectedUnit$;
  }

  onIncrease(itemId: number, items: ICartItem[]): void {
    const currentItem = items.find((item) => item.id === itemId);
    if (!currentItem) {
      return;
    }
    this.cartService.updateQuantity(itemId, currentItem.quantity + 1);
  }

  onDecrease(itemId: number, items: ICartItem[]): void {
    const currentItem = items.find((item) => item.id === itemId);
    if (!currentItem) {
      return;
    }
    this.cartService.updateQuantity(itemId, currentItem.quantity - 1);
  }

  onClear(): void {
    this.cartService.clearCart();
  }
}
