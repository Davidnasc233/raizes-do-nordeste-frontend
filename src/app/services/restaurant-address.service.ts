import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MOCK_RESTAURANTS } from '../models/restaurant.mock';
import { IRestaurantsResponse, IRestaurantUnit } from '../models/restaurant-models';
import { MenuCategory } from '../shared/enum/category.enum';

@Injectable({
  providedIn: 'root',
})
export class RestaurantAddressService {
  private readonly mockData: IRestaurantsResponse = MOCK_RESTAURANTS;

  private readonly selectedRestaurantSub = new BehaviorSubject<IRestaurantUnit | null>(
    this.mockData.unit[0] ?? null,
  );
  private readonly selectedCategorySub = new BehaviorSubject<string | null>(MenuCategory.ALL);

  readonly selectCategory$: Observable<string | null> = this.selectedCategorySub.asObservable();

  readonly selectedUnit$: Observable<IRestaurantUnit | null> =
    this.selectedRestaurantSub.asObservable();

  constructor() {}

  getData(): Observable<IRestaurantsResponse> {
    return of(this.mockData);
  }

  selectRestaurant(unit: IRestaurantUnit) {
    this.selectedRestaurantSub.next(unit);
  }

  selectCategory(category: string) {
    this.selectedCategorySub.next(category);
  }
}
