import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MOCK_RESTAURANTS } from '../models/restaurant.mock';
import { RestaurantsResponse, RestaurantUnit } from '../models/restaurant-models';

@Injectable({
    providedIn: 'root',
})
export class RestaurantAddressService {
    private mockData: RestaurantsResponse = MOCK_RESTAURANTS;

    private readonly selectedRestaurantSub = new BehaviorSubject<RestaurantUnit | null>(
        this.mockData.unit[0] ?? null,
    );

    readonly selectedUnit$: Observable<RestaurantUnit | null> =
        this.selectedRestaurantSub.asObservable();

    constructor() {}

    getData(): Observable<RestaurantsResponse> {
        return of(this.mockData);
    }

    selectRestaurant(unit: RestaurantUnit) {
        this.selectedRestaurantSub.next(unit);
    }
}