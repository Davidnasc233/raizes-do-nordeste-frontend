import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { DishCard } from './dish-card';

registerLocaleData(localePt);

describe('DishCard', () => {
  let component: DishCard;
  let fixture: ComponentFixture<DishCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishCard],
      providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    }).compileComponents();

    fixture = TestBed.createComponent(DishCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
