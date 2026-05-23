import { Component } from '@angular/core';
import { RestaurantAddressService } from '../../../../services/restaurant-address.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-restaurant-modal',
  imports: [CommonModule],
  templateUrl: './choose-restaurant-modal.html',
  styleUrl: './choose-restaurant-modal.css',
})
export class ChooseRestaurantModal {
  unit: any[] = [];
  selectedUnit: any = null;

  constructor(private restaurantAddressService: RestaurantAddressService) {}

  ngOnInit() {
    this.restaurantAddressService.getData().subscribe((data) => {
      this.unit = data.unit;
      this.selectedUnit = this.unit[0] ?? null;
    });
  }

  onSelectChange(unit: any) {
    this.selectedUnit = unit;
    this.restaurantAddressService.selectRestaurant(unit);
  }
}
