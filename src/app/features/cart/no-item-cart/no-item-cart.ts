import { Component } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-no-item-cart',
  imports: [],
  templateUrl: './no-item-cart.html',
  styleUrl: './no-item-cart.css',
})
export class NoItemCart { 

  constructor(
    private navigationService: NavigationService
  ) {}

  redirectToMenu() {
    this.navigationService.navigateTo('home')
  }
}
