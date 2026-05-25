import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ICartItem } from '../../../models/cart-item.model';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-payment',
  imports: [AsyncPipe, CurrencyPipe, NgClass],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit {
  totalValue$!: Observable<number>;
  deliveryFee: number = 7.9;
  totalPayment$!: Observable<number>;
  isLoading: boolean = false;
  @Input() data: ICartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getTotalValue();
    this.totalPayment$ = this.cartService.totalValue$.pipe(
      map((totalValue) => totalValue + this.deliveryFee),
    );
  }

  redirectRefusePayment() {
    const refusedOrder = this.cartService.createOrder('refused', this.data);
    this.cartService.clearCart();
    
    this.router.navigate(['/cart/payment-status'], {
      state: {
        cartData: this.data,
        paymentStatus: 'refused',
        order: refusedOrder,
      },
    });
  }

  redirectAcceptedPayment() {
    this.isLoading = true;

    setTimeout(() => {
      const acceptedOrder = this.cartService.createOrder('accepted', this.data);
      this.cartService.clearCart();

      this.router
        .navigate(['/cart/payment-status'], {
          state: {
            cartData: this.data,
            paymentStatus: 'accepted',
            order: acceptedOrder,
          },
        })
        .finally(() => {
          this.isLoading = false;
        });
    }, 2000);
  }

  getTotalValue() {
    this.totalValue$ = this.cartService.totalValue$;
  }
}
