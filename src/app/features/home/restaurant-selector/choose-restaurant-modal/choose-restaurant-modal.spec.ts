import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRestaurantModal } from './choose-restaurant-modal';

describe('ChooseRestaurantModal', () => {
  let component: ChooseRestaurantModal;
  let fixture: ComponentFixture<ChooseRestaurantModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseRestaurantModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseRestaurantModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
