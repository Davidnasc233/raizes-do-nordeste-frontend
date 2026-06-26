import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ICartItem } from '../../../models/cart-item.model';
import { ToastService } from '../../../services/toast.service';
import { UserStorageService } from '../../../services/user-storage.service';
import { IUserProfile } from '../../../models/user.model';

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
  user$!: Observable<IUserProfile | null>;
  @Input() data: ICartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private userStorageService: UserStorageService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.getTotalValue();
    this.user$ = this.userStorageService.user$;
    this.totalPayment$ = this.cartService.totalValue$.pipe(
      map((totalValue) => totalValue + this.deliveryFee),
    );
  }

  redirectRefusePayment() {
    if (!this.hasValidItems()) {
      this.toastService.show(
        'Carrinho vazio. Adicione itens antes de finalizar o pedido.',
        'warning',
      );
      return;
    }

    if (!this.userStorageService.getCurrentUser()) {
      this.router.navigate(['/login']);
      return;
    }

    const refusedOrder = this.cartService.createOrder('refused', this.data);
    this.cartService.clearCart();

    this.router.navigate(['/cart/payment-status'], {
      state: {
        cartData: refusedOrder.items,
        paymentStatus: 'refused',
        order: refusedOrder,
      },
    });
  }

  redirectAcceptedPayment() {
    if (!this.hasValidItems()) {
      this.toastService.show(
        'Carrinho vazio. Adicione itens antes de finalizar o pedido.',
        'warning',
      );
      return;
    }

    if (!this.userStorageService.getCurrentUser()) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const acceptedOrder = this.cartService.createOrder('accepted', this.data);
      this.cartService.clearCart();

      this.router
        .navigate(['/cart/payment-status'], {
          state: {
            cartData: acceptedOrder.items,
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

  private hasValidItems(): boolean {
    return this.data.some((item) => item.quantity > 0);
  }
}
