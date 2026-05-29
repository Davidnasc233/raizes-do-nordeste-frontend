import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map, Observable, startWith } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

type NavBarRouteData = {
  compact?: boolean;
  title?: string;
  icon?: string;
  showOrderCode?: boolean;
};

type NavBarState = {
  compact: boolean;
  title: string;
  icon: string;
  showOrderCode: boolean;
};

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  hasNotification = false;
  currentRoute$!: Observable<string>;
  orderCode$!: Observable<string | undefined>;
  navBarState$!: Observable<NavBarState>;
  navBarTitle$!: Observable<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.currentRoute$ = this.navigationService.selectedRoute$;
    this.orderCode$ = this.cartService.lastOrder$.pipe(map((lastOrder) => lastOrder?.orderCode));
    this.navBarState$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        const activeRoute = this.getDeepestActiveRoute();
        const navBarData = activeRoute.snapshot.data['navBar'] as NavBarRouteData | undefined;

        return {
          compact: !!navBarData?.compact,
          title: navBarData?.title ?? '',
          icon: navBarData?.icon ?? '',
          showOrderCode: !!navBarData?.showOrderCode,
        };
      }),
    );
    this.navBarTitle$ = combineLatest([this.navBarState$, this.orderCode$]).pipe(
      map(([state, orderCode]) =>
        state.showOrderCode && orderCode ? `${state.title} ${orderCode}` : state.title,
      ),
    );
  }

  redirectTo() {
    const activeRoute = this.getDeepestActiveRoute();

    if (activeRoute.snapshot.data['clearCartOnBack']) {
      this.cartService.clearCart();
    }

    return this.router.navigateByUrl('/home');
  }

  redirectToRoute(route: string) {
    return this.router.navigateByUrl(`${route}`);
  }
  
  toggleNotification(): void {
    this.hasNotification = !this.hasNotification;
  }

  private getDeepestActiveRoute(): ActivatedRoute {
    let activeRoute = this.activatedRoute;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    return activeRoute;
  }
}
