import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AsyncPipe } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent implements OnInit {
  currentRoute$!: Observable<string>;
  countCart$!: Observable<number>;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.countCart$ = this.cartService.totalItems$;
    this.currentRoute$ = this.navigationService.selectedRoute$;
  }

  selectButton(value: string) {
    this.navigationService.navigateTo(value);
  }

  redirectToRoute(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
