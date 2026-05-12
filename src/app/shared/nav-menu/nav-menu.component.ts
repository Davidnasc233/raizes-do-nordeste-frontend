import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent {
  isSelected: string = 'home';

  constructor(private router: Router) {}

  selectButton(value: string) {
    this.isSelected = value;
    this.redirectToRoute(value);
  }

  redirectToRoute(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
