import { Component } from '@angular/core';
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
export class RestaurantSelector {
  title: string = 'Salvador' 
  unit$: Observable<any>;
  data: { unit: any[] } = { unit: [] };
  
  constructor(
    private restaurantAddressService: RestaurantAddressService
  ) {
    this.unit$ = this.restaurantAddressService.selectedUnit$;
  }
  
  ngOnInit() {
    this.restaurantAddressService.getData().subscribe( data => {
      this.data = data;
    });
  }
}
