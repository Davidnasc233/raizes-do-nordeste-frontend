import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent implements OnInit {
  isSelected: string = 'home';
  countCart: number = 1;
  currentRoute: string = '';
  countCart$!: Observable<number>

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.countCart$ = this.cartService.totalItems$;
  }

  selectButton(value: string) {
    this.isSelected = value;
    this.redirectToRoute(value);
    this.isCartRoute(value);
  }

  redirectToRoute(route: string) {
    this.router.navigate([`/${route}`]);
  }

  isCartRoute(route: string): boolean {
    if (route === 'cart') {
      this.currentRoute = 'cart';
      return true;
    }
    return false;
  }
}
