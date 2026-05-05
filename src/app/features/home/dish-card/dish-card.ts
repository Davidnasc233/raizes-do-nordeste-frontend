import { Component } from '@angular/core';
import { RestaurantAddressService } from '../../../services/restaurant-address.service';
import { Subject, Subscription } from 'rxjs';
import { MenuItem } from '../../../models/restaurant-models';

export interface RestaurantUnit {
    id: number;
    name: string;
    address: string;
    menu?: any;
}

@Component({
    selector: 'app-dish-card',
    imports: [],
    templateUrl: './dish-card.html',
    styleUrl: './dish-card.css',
})
export class DishCard {
    data: any = {};
    recipes: MenuItem[] = [];
    selectRestaurant: RestaurantUnit | null = null;
    private unitSubscription?: Subscription;
    private destroy$ = new Subject<void>();

    constructor(private readonly restaurantAddressService: RestaurantAddressService) {}

    ngOnInit() {
        this.restaurantAddressService.getData().subscribe((data) => {
            this.data = data;
        });
        this.unitSubscription = this.restaurantAddressService.selectedUnit$.subscribe((unit) => {
            this.selectRestaurant = unit;
            this.recipes = this.selectRestaurant?.menu ?? null;
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
