import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { IOrder } from '../../models/order.model';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  hasNotification = false;
  currentRoute$!: Observable<string>;
  orderCode: string | undefined;

  constructor(
    private router: Router,
    private cartService: CartService,
    private navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.currentRoute$ = this.navigationService.selectedRoute$;
    this.cartService.lastOrder$.subscribe(lastOrder => {
      this.orderCode = lastOrder?.orderCode;
    });
  }

  redirectTo() {
    const url = this.router.url;

    if (url.includes('payment-status')) {
      this.cartService.clearCart();
    }
    return this.router.navigateByUrl('/home');
  }

  redirectToHome() {
    const url = this.router.url;
    return this.router.navigateByUrl('/home');
  }

  toggleNotification(): void {
    this.hasNotification = !this.hasNotification;
  }
}
