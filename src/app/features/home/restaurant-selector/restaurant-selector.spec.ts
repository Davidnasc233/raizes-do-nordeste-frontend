import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { vi } from 'vitest';

import { RestaurantSelector } from './restaurant-selector';
import { RestaurantAddressService } from '../../../services/restaurant-address.service';
import { CartService } from '../../../services/cart.service';

describe('RestaurantSelector', () => {
  let component: RestaurantSelector;
  let fixture: ComponentFixture<RestaurantSelector>;
  const selectedUnitSubject = new BehaviorSubject({
    id: 1,
    name: 'Unidade Centro',
    address: 'Rua A, 100',
    menu: [],
  });

  const restaurantServiceSpy = {
    selectedUnit$: selectedUnitSubject.asObservable(),
    getData: vi.fn().mockReturnValue(
      of({
        unit: [
          { id: 1, name: 'Unidade Centro', address: 'Rua A, 100', menu: [] },
          { id: 2, name: 'Unidade Praia', address: 'Av. B, 200', menu: [] },
        ],
      }),
    ),
    selectRestaurant: vi.fn((unit) => selectedUnitSubject.next(unit)),
  };

  const cartServiceSpy = {
    clearCart: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [RestaurantSelector],
      providers: [
        { provide: RestaurantAddressService, useValue: restaurantServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve permitir seleção de unidade para cardápio dinâmico (caso positivo)', () => {
    const unidadePraia = {
      id: 2,
      name: 'Unidade Praia',
      address: 'Av. B, 200',
      menu: [],
    };

    component.menuOpen = true;
    component.selectUnit(unidadePraia);

    expect(restaurantServiceSpy.selectRestaurant).toHaveBeenCalledWith(unidadePraia);
    expect(component.selectedRestaurant).toEqual(unidadePraia);
    expect(component.menuOpen).toBe(false);
    expect(cartServiceSpy.clearCart).toHaveBeenCalledTimes(1);
  });
});
