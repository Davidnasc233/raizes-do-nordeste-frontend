import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { Cart } from './features/cart/cart';
import { UserProfile } from './features/user-profile/user-profile';
import { PaymentStatusComponent } from './features/cart/payment/payment-status/payment-status';
import { Login } from './features/login/login';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'cart', component: Cart },
  { path: 'cart/payment-status', component: PaymentStatusComponent },
  { path: 'user-profile', component: UserProfile, canActivate: [AuthGuard] },
  { path: 'login', component: Login },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
