import { Component } from '@angular/core';
import { NoItemCart } from './no-item-cart/no-item-cart';

@Component({
  selector: 'app-cart',
  imports: [NoItemCart],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cart: string[] = []
  selectedUnit: string = "Ba - Salvador"
}
