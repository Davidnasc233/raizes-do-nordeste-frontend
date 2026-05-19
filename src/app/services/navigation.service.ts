import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private selectedRouteSubject = new BehaviorSubject<string>('home');
  selectedRoute$: Observable<string> = this.selectedRouteSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const firstSegment = this.router.routerState.snapshot.root.firstChild?.routeConfig?.path;
      const activeRoute = firstSegment === '' ? 'home' : (firstSegment || 'home');
      
      this.selectedRouteSubject.next(activeRoute);
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}