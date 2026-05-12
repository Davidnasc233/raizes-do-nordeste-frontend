import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { Cart } from './features/cart/cart';
import { UserProfile } from './features/user-profile/user-profile';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: Cart },
  { path: 'user-profile', component: UserProfile },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
