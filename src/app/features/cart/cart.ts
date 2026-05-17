import { Component, OnInit } from '@angular/core';
import { NoItemCart } from './no-item-cart/no-item-cart';
import { CartItems } from './cart-items/cart-items';
import { Payment } from './payment/payment';
import { Observable } from 'rxjs';
import { ICartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [NoItemCart, CartItems, Payment, AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems$!: Observable<ICartItem[]>;
  selectedUnit: string = 'Ba - Salvador';

  constructor(
    public cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.items$;
  }

  
}
