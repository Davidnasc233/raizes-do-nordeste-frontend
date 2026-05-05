import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestaurantAddressService } from '../../../services/restaurant-address.service';
import { MenuItem, RestaurantUnit } from '../../../models/restaurant-models';

@Component({
    selector: 'app-food-menu',
    imports: [],
    templateUrl: './food-menu.html',
    styleUrl: './food-menu.css',
})
export class FoodMenu {
    private RestaurantSelected?: Subscription;
    restaurantSelected: RestaurantUnit | null = null;
    menuRes: MenuItem[] | null = [];
    data: any = {};
    selectOptions: { name: string; value: string }[] = [
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
    ];
    countItems: number = 0;
    selectedButton: any = 'all';

    constructor(private restaurantAddressService: RestaurantAddressService) {}

    ngOnInit() {
        this.restaurantAddressService.getData().subscribe((data) => {
            this.data = data;
        });
        this.RestaurantSelected = this.restaurantAddressService.selectedUnit$.subscribe((unit) => {
            this.restaurantSelected = unit;
        });
        this.menuRes = this.restaurantSelected?.menu ?? null;
        this.countMenu();
    }

    selectOption(value: string) {
        this.selectedButton = value;
    }

    countMenu() {
        if (!this.menuRes) {
            return (this.countItems = 0);
        }

        return (this.countItems = this.menuRes.length);
    }

    filterMenuCategory(category: string) {
        if (!category || category === 'all') {
            this.menuRes;
            return;
        }

        // Filtra a partir da lista original do restaurante selecionado
        if (this.menuRes) {
            const newList = this.menuRes.filter((item) => item.category === category);
        }
    }
}
