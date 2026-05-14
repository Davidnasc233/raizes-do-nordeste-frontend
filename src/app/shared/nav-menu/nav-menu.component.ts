import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent {
  isSelected: string = 'home';
  countCart: number = 1;
  currentRoute: string = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

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
