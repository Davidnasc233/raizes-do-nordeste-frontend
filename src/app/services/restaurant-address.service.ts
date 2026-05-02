// restaurante.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

type RestaurantUnit = {
  id: number;
  name: string;
  address: string;
  menu: any[];
};

type RestaurantsResponse = {
  unit: RestaurantUnit[];
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantAddressService {
  private mockData: RestaurantsResponse = {
    unit: [
      {
        id: 1,
        name: 'Salvador - BA',
        address: 'Av. Oceânica, 123 - Barra, Salvador - BA',
        menu: []
      },
      {
        id: 2,
        name: 'Aracaju - SE',
        address: 'Rua da Praia, 456 - Atalaia, Aracaju - SE',
        menu: []
      },
      {
        id: 3,
        name: 'Recife - PE',
        address: 'Rua Boa Viagem, 321 - Boa Viagem, Recife - PE',
        menu: []
      },
      {
        id: 4,
        name: 'Maceió - AL',
        address: 'Av. Álvaro Otacílio, 789 - Ponta Verde, Maceió - AL',
        menu: []
      }
    ]
  };
  
  private readonly selectedRestaurantSub = new BehaviorSubject<RestaurantUnit | null>(this.mockData.unit[0] ?? null);

  readonly selectedUnit$: Observable<RestaurantUnit | null> = this.selectedRestaurantSub.asObservable();

  constructor() {}

  getData(): Observable<RestaurantsResponse> {
    return of(this.mockData);
  }

  selectRestaurant(unit: RestaurantUnit) {
    this.selectedRestaurantSub.next(unit);
  }
}