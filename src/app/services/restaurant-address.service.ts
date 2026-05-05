import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MOCK_RESTAURANTS } from '../models/restaurant.mock';
import { RestaurantsResponse, RestaurantUnit } from '../models/restaurant-models';
import { MenuCategory } from '../shared/enum/category.enum';

@Injectable({
    providedIn: 'root',
})
export class RestaurantAddressService {
    private  readonly mockData: RestaurantsResponse = MOCK_RESTAURANTS;

    private readonly selectedRestaurantSub = new BehaviorSubject<RestaurantUnit | null>(
        this.mockData.unit[0] ?? null,
    );
    private readonly selectedCategorySub = new BehaviorSubject<string | null>(MenuCategory.ALL); 


    readonly selectCategory$: Observable<string | null> =
    this.selectedCategorySub.asObservable();

    readonly selectedUnit$: Observable<RestaurantUnit | null> =
        this.selectedRestaurantSub.asObservable();

    constructor() {}

    getData(): Observable<RestaurantsResponse> {
        return of(this.mockData);
    }

    selectRestaurant(unit: RestaurantUnit) {
        this.selectedRestaurantSub.next(unit);
    }

    selectCategory(category: string) {
        this.selectedCategorySub.next(category);
    }
}