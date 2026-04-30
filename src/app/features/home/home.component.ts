import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavMenuComponent } from '../../shared/nav-menu/nav-menu.component';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, NavMenuComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
  title: string = 'Salvador' 
}
