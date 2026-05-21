import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { Cart } from './features/cart/cart';
import { UserProfile } from './features/user-profile/user-profile';
import { RefusePaymentComponent } from './features/cart/payment/refuse-payment/refuse-payment';

export const routes: Routes = [
  { path: 'cart', component: Cart },
  { path: 'cart/refuse-payment', component: RefusePaymentComponent },
  { path: 'user-profile', component: UserProfile },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];
