import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LgpdModalComponent } from './shared/lgpd-modal/lgpd-modal';
import { NavMenuComponent } from "./shared/nav-menu/nav-menu.component";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { ToastService } from './services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HomeComponent, LgpdModalComponent, NavMenuComponent, NavBarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  constructor(
    private router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.router.navigate(['/']);
  }
}
