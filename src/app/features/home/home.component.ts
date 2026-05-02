import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavMenuComponent } from '../../shared/nav-menu/nav-menu.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FoodMenu } from './food-menu/food-menu';
import { DishCard } from './dish-card/dish-card';
import { RestaurantSelector } from './restaurant-selector/restaurant-selector';
import { ChooseRestaurantModal } from './restaurant-selector/choose-restaurant-modal/choose-restaurant-modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, NavMenuComponent, CarouselComponent, FoodMenu, DishCard, RestaurantSelector, ChooseRestaurantModal],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
}
