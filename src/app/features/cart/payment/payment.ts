import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTotalValue();
    this.totalPayment$ = this.cartService.totalValue$.pipe(
      map(totalValue => totalValue + this.deliveryFee)
    );
  }

  redirectRefusePayment() {
    this.router.navigate(['/cart/refuse-payment']);
  }

  getTotalValue() {
    this.totalValue$ = this.cartService.totalValue$;
  }
}
