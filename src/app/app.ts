import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LgpdModalComponent } from './shared/lgpd-modal/lgpd-modal';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ToastService } from './services/toast.service';
import { CommonModule } from '@angular/common';
import { ToastModalComponent } from './shared/toast/toast-modal.component';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LgpdModalComponent,
    NavMenuComponent,
    NavBarComponent,
    CommonModule,
    ToastModalComponent,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  get showFooterOnHomeOnly(): boolean {
    return this.router.url === '/home';
  }

  constructor(
    private router: Router,
    public toastService: ToastService,
  ) {}

  ngOnInit() {
    this.router.navigate(['/']);
  }
}
