import { Component } from '@angular/core';
import { NoItemCart } from './no-item-cart/no-item-cart';
import { CartItems } from './cart-items/cart-items';
import { Payment } from './payment/payment';

@Component({
  selector: 'app-cart',
  imports: [NoItemCart, CartItems, Payment],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cart: any[] = [
    {
      id: 1,
      image: 'images/acaraje.jpg',
      name: 'Acarajé',
      price: 8,
      quantity: 2,
    },
  ];
  selectedUnit: string = 'Ba - Salvador';
}
