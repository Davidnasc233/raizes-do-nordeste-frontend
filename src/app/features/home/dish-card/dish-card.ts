import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantAddressService } from '../../../services/restaurant-address.service';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { MenuItem } from '../../../models/restaurant-models';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { ToastService } from '../../../services/toast.service';

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

    constructor(
        private readonly restaurantAddressService: RestaurantAddressService,
        private cartService: CartService,
        private toastService: ToastService
    ) {}

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

    addToCart(item: MenuItem) {
        const itemToAdd = {
            id: item.id,
            image: item.image,
            name: item.name,
            price: item.price ?? 0
        }
        this.toastService.show(`${item.name} adicionado ao carrinho`, 'success')
        this.cartService.addToCart(itemToAdd)
    }
}
