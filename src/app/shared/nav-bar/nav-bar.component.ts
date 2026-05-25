import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

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
  orderCode$!: Observable<string>;

  constructor(
    private router: Router,
    private cartService: CartService,
    private navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.currentRoute$ = this.navigationService.selectedRoute$;
    this.orderCode$ = this.cartService.latestOrderCode$;
  }

  redirectTo() {
    const url = this.router.url;

    if (url.includes('payment-status')) {
      this.cartService.clearCart();
    }
    return this.router.navigateByUrl('/home');
  }

  toggleNotification(): void {
    this.hasNotification = !this.hasNotification;
  }
}
