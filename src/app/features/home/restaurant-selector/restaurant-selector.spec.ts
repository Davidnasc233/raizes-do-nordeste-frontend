import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSelector } from './restaurant-selector';

describe('RestaurantSelector', () => {
  let component: RestaurantSelector;
  let fixture: ComponentFixture<RestaurantSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
