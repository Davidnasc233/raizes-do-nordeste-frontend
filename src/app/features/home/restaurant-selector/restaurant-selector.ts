import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RestaurantAddressService } from '../../../services/restaurant-address.service';

@Component({
    selector: 'app-restaurant-selector',
    imports: [CommonModule, FormsModule],
    templateUrl: './restaurant-selector.html',
    styleUrl: './restaurant-selector.css',
})
export class RestaurantSelector implements OnInit {
    menuOpen = false;
    unit$: Observable<any>;
    data: { unit: any[] } = { unit: [] };
    selectedRestaurant: any = null;

    constructor(
      private readonly restaurantAddressService: RestaurantAddressService) {
        this.unit$ = this.restaurantAddressService.selectedUnit$;
    }

    ngOnInit() {
        this.restaurantAddressService.getData().subscribe((data) => {
            this.data = data;
        });
        this.selectedRestaurant = this.data.unit[0];
    }

    toggleMenu(event: Event) {
        event.stopPropagation();
        this.menuOpen = !this.menuOpen;
    }

    selectUnit(unit: any) {
        this.restaurantAddressService.selectRestaurant(unit);
        this.selectedRestaurant = unit;
        this.menuOpen = false;
    }
}
