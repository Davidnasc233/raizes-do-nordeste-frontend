import { Component } from '@angular/core';
import { ValidateLgpdService } from '../../services/validate-lgpd-consent.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { IUserProfile } from '../../models/user.model';
import { UserStorageService } from '../../services/user-storage.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { IOrder } from '../../models/order.model';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  hasAcceptedLgpd$!: Observable<boolean | null>;
  orders$!: Observable<IOrder[]>;
  user$!: Observable<IUserProfile | null>;
  totalOrderValue$!: Observable<number>;

  constructor(
    private readonly validateLgpdService: ValidateLgpdService,
    private readonly userStorageService: UserStorageService,
    private readonly cartService: CartService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.hasAcceptedLgpd$ = this.validateLgpdService.lgpdConsent$;
    this.user$ = this.userStorageService.user$;
    this.orders$ = this.cartService.orders$;
  }

  get orderStatus() {
    return (order: IOrder) => {
      if (order.status === 'accepted') {
        return 'Aceito';
      } else if (order.status === 'refused') {
        return 'Cancelado';
      }
      return '';
    }
  }

  revokeLgpdConsent(): void {
    this.validateLgpdService.refuseLgpd();
  }

  logout() {
    const user = this.userStorageService.getCurrentUser();
    if (user) {
      const loggedUser = { ...user, isLogged: false };
      this.userStorageService.saveUser(loggedUser);
    }
    this.router.navigate(['/login']);
  }

  getTotalOrderValue(order: IOrder): Observable<number> {
    return this.cartService.calculateOrdersTotalValue(order);
  }

  deleteAllData() {
    this.userStorageService.clearUser();
    localStorage.removeItem('user_lgpd_consent');
    localStorage.removeItem('orders');
  }
}
