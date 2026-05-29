import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { RestaurantAddressService } from '../../../services/restaurant-address.service';
import { IMenuItem, IRestaurantUnit } from '../../../models/restaurant-models';
import { MenuCategory } from '../../../shared/enum/category.enum';

@Component({
  selector: 'app-food-menu',
  imports: [],
  templateUrl: './food-menu.html',
  styleUrl: './food-menu.css',
})
export class FoodMenu implements OnInit {
  private readonly destroy$ = new Subject<void>();
  restaurantSelected: IRestaurantUnit | null = null;
  menuRes: IMenuItem[] | null = [];
  data: any = {};
  selectedCategory: any = null;
  selectOptions: { name: string; value: string }[] = [
    {
      name: 'Tudo',
      value: MenuCategory.ALL,
    },
    {
      name: 'Pratos',
      value: MenuCategory.DISHES,
    },
    {
      name: 'Bebidas',
      value: MenuCategory.DRINKS,
    },
    {
      name: 'Sobremesas',
      value: MenuCategory.DESSERTS,
    },
  ];
  countItems: number = 0;

  constructor(private readonly restaurantAddressService: RestaurantAddressService) {}

  ngOnInit() {
    combineLatest([
      this.restaurantAddressService.selectedUnit$,
      this.restaurantAddressService.selectCategory$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([unit, category]) => {
        this.restaurantSelected = unit;
        this.selectedCategory = category;

        const allItems = unit?.menu ?? [];

        if (!category || category === MenuCategory.ALL) {
          this.menuRes = allItems;
          this.countItems = allItems.length;
        } else {
          const filtered = allItems.filter((item) => item.category === category);
          this.menuRes = filtered;
          this.countItems = filtered.length;
        }
      });
  }

  selectOption(value: string) {
    this.restaurantAddressService.selectCategory(value);
  }
}
