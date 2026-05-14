import { Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { FoodMenu } from './food-menu/food-menu';
import { DishCard } from './dish-card/dish-card';
import { RestaurantSelector } from './restaurant-selector/restaurant-selector';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, FoodMenu, DishCard, RestaurantSelector],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
}
