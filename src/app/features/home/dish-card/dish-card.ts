import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantAddressService } from '../../../services/restaurant-address.service';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { MenuItem } from '../../../models/restaurant-models';
import { CommonModule, CurrencyPipe } from '@angular/common';

export interface RestaurantUnit {
    id: number;
    name: string;
    address: string;
    menu?: any;
}

@Component({
    selector: 'app-dish-card',
    imports: [CurrencyPipe, CommonModule],
    templateUrl: './dish-card.html',
    styleUrl: './dish-card.css',
})
export class DishCard implements OnInit, OnDestroy {
    data: any = {};
    recipes: MenuItem[] = [];
    filteredRecipes$!: Observable<MenuItem[] | null>;
    private readonly destroy$ = new Subject<void>();

    constructor(private readonly restaurantAddressService: RestaurantAddressService) {}

    ngOnInit() {
        this.restaurantAddressService.getData().subscribe((data) => {
            this.data = data;
        });
        this.filteredRecipes$ = combineLatest([
            this.restaurantAddressService.selectedUnit$,
            this.restaurantAddressService.selectCategory$,
        ]).pipe(
            takeUntil(this.destroy$),
            map(([unit, category]) => {
            const recipes = unit?.menu ?? [];
    
            if (!category || category === 'all') {
                return recipes;
            }
    
            return recipes.filter((item) => item.category === category);
            }),
        );
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
