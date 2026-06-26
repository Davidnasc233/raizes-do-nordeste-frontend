import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Loyalty } from './loyalty';
import { UserStorageService } from '../../services/user-storage.service';

describe('Loyalty', () => {
  let component: Loyalty;
  let fixture: ComponentFixture<Loyalty>;

  const userStorageSpy = {
    user$: of({
      id: 'user-10',
      name: 'Joana',
      email: 'joana@email.com',
      password: '123456',
      isLogged: true,
      points: 300,
      ordersCount: 4,
      updatedAt: new Date().toISOString(),
    }),
    getCurrentUser: () => ({
      id: 'user-10',
      name: 'Joana',
      email: 'joana@email.com',
      password: '123456',
      isLogged: true,
      points: 300,
      ordersCount: 4,
      updatedAt: new Date().toISOString(),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loyalty],
      providers: [{ provide: UserStorageService, useValue: userStorageSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(Loyalty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve aplicar desconto no programa de fidelidade (caso positivo)', () => {
    expect(component.userPoints).toBe(300);
    expect(component.currentLevel.name).toBe('Sertanej@');
    expect(component.currentLevel.benefit).toContain('10% off');
    expect(component.progressPercentage).toBe(60);
  });
});
