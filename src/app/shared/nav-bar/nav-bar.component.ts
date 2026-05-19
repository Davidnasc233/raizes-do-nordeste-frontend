import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  hasNotification = false;
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const firstSegment = this.router.routerState.snapshot.root.firstChild?.routeConfig?.path;
      this.currentRoute = firstSegment === '' ? 'home' : firstSegment || '';
    });
  }

  redirectTo() {
    this.router.navigateByUrl('/home')
  }

  toggleNotification(): void {
    this.hasNotification = !this.hasNotification;
  }
}
