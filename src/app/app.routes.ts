import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { Cart } from './features/cart/cart';
import { UserProfile } from './features/user-profile/user-profile';
import { PaymentStatusComponent } from './features/cart/payment/payment-status/payment-status';
import { Login } from './features/login/login';
import { AuthGuard } from './guards/auth.guard';
import { PromotionNotification } from './features/promotion-select/promotion-notification/promotion-notification';

export const routes: Routes = [
  {
    path: 'cart',
    component: Cart,
    data: {
      hideNavMenu: true,
      navBar: { compact: true, title: 'Carrinho' },
    },
  },
  {
    path: 'cart/payment-status',
    component: PaymentStatusComponent,
    data: {
      hideNavMenu: true,
      clearCartOnBack: true,
      navBar: { compact: true, title: 'Pedido', showOrderCode: true },
    },
  },
  { path: 'user-profile', component: UserProfile, canActivate: [AuthGuard] },
  { path: 'login', component: Login },
  { path: 'home', component: HomeComponent },
  { 
    path: 'promotion', 
    component: PromotionNotification, 
    data: { 
      hideNavMenu: true,
      navBar: { compact: true, title: 'Promoções', icon:'fa-solid fa-tag' },
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
