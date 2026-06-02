import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
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
  hideNavMenu$!: Observable<boolean>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.countCart$ = this.cartService.totalItems$;
    this.currentRoute$ = this.navigationService.selectedRoute$;
    this.hideNavMenu$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let activeRoute = this.activatedRoute;

        while (activeRoute.firstChild) {
          activeRoute = activeRoute.firstChild;
        }

        return !!activeRoute.snapshot.data['hideNavMenu'];
      }),
    );
  }

  selectButton(value: string) {
    this.navigationService.navigateTo(value);
  }

  redirectToRoute(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
