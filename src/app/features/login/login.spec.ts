import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { Login } from './login';
import { UserStorageService } from '../../services/user-storage.service';
import { ToastService } from '../../services/toast.service';

describe('Login - Cadastro', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let userStorageSpy: {
    saveUser: ReturnType<typeof vi.fn>;
    getCurrentUser: ReturnType<typeof vi.fn>;
  };
  let toastSpy: { show: ReturnType<typeof vi.fn> };
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    userStorageSpy = {
      saveUser: vi.fn(),
      getCurrentUser: vi.fn(),
    };
    toastSpy = {
      show: vi.fn(),
    };
    routerSpy = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: UserStorageService, useValue: userStorageSpy as unknown as UserStorageService },
        { provide: ToastService, useValue: toastSpy as unknown as ToastService },
        { provide: Router, useValue: routerSpy as unknown as Router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve cadastrar novo usuário com dados válidos (CT positivo)', () => {
    component.registerToggle();

    component.loginForm.setValue({
      name: 'Maria Silva',
      email: 'maria.teste@email.com',
      password: 'Teste@123',
    });

    component.onConfirmLogin();

    expect(userStorageSpy.saveUser).toHaveBeenCalledTimes(1);
    expect(userStorageSpy.saveUser).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Maria Silva',
        email: 'maria.teste@email.com',
        password: 'Teste@123',
        isLogged: true,
        points: 100,
        ordersCount: 0,
        updatedAt: expect.any(String),
      }),
    );
    expect(component.register).toBe(false);
    expect(toastSpy.show).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
