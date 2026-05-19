import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit {
  totalValue$!: Observable<number>;
  deliveryFee: number = 7.9;
  totalPayment$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getTotalValue();
    this.totalPayment$ = this.cartService.totalValue$.pipe(
      map(totalValue => totalValue + this.deliveryFee)
    );
  }

  getTotalValue() {
    this.totalValue$ = this.cartService.totalValue$;
  }
}
