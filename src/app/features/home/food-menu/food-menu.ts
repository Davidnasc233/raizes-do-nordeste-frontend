import { Component } from '@angular/core';

@Component({
  selector: 'app-food-menu',
  imports: [],
  templateUrl: './food-menu.html',
  styleUrl: './food-menu.css',
})
export class FoodMenu {
  selectOptions: { name: string, value: string }[] = [
    {
      name: 'Tudo',
      value: 'all',
    },
    {
      name: 'Pratos',
      value: 'dishes',
    },
    {
      name: 'Bebidas',
      value: 'drinks',
    },
    {
      name: 'Sobremesas',
      value: 'desserts',
    },
  ]
  countItems: number = 7;
  selectedButton: any = 'all';

  selectOption(value: string) {
    this.selectedButton = value;
  }
}
