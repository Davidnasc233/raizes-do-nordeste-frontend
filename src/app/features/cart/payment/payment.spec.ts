import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { Payment } from './payment';
import { CartService } from '../../../services/cart.service';
import { ToastService } from '../../../services/toast.service';
import { UserStorageService } from '../../../services/user-storage.service';

registerLocaleData(localePt);

describe('Payment', () => {
  let component: Payment;
  let fixture: ComponentFixture<Payment>;

  const cartServiceSpy = {
    totalValue$: of(0),
    createOrder: vi.fn(),
    clearCart: vi.fn(),
  };

  const routerSpy = {
    navigate: vi.fn().mockResolvedValue(true),
  };

  const userStorageSpy = {
    user$: of(null),
    getCurrentUser: vi.fn().mockReturnValue({
      id: '1',
      name: 'Maria',
      email: 'maria@email.com',
      password: '123456',
      isLogged: true,
      points: 100,
      ordersCount: 1,
      updatedAt: new Date().toISOString(),
    }),
  };

  const toastSpy = {
    show: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Payment],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UserStorageService, useValue: userStorageSpy },
        { provide: ToastService, useValue: toastSpy },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Payment);
    component = fixture.componentInstance;
    component.data = [];
    fixture.detectChanges();
  });

  it('deve bloquear pagamento aceito com carrinho vazio (caso negativo)', () => {
    component.redirectAcceptedPayment();

    expect(toastSpy.show).toHaveBeenCalledWith(
      'Carrinho vazio. Adicione itens antes de finalizar o pedido.',
      'warning',
    );
    expect(cartServiceSpy.createOrder).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('deve bloquear simulação de recusa com carrinho vazio (caso negativo)', () => {
    component.redirectRefusePayment();

    expect(toastSpy.show).toHaveBeenCalledWith(
      'Carrinho vazio. Adicione itens antes de finalizar o pedido.',
      'warning',
    );
    expect(cartServiceSpy.createOrder).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('deve processar pagamento via gateway e finalizar pedido (caso positivo)', async () => {
    vi.useFakeTimers();

    const cartItems = [
      {
        id: 10,
        name: 'Baião de dois',
        image: 'img.png',
        price: 29.9,
        quantity: 1,
      },
    ];

    const acceptedOrder = {
      id: 'order-1',
      orderCode: 'PEDABCDE',
      status: 'accepted',
      deliveryStatus: 'Recebido',
      items: cartItems,
      createdAt: new Date().toISOString(),
    };

    component.data = cartItems;
    cartServiceSpy.createOrder.mockReturnValue(acceptedOrder);

    component.redirectAcceptedPayment();

    expect(component.isLoading).toBe(true);

    await vi.advanceTimersByTimeAsync(2000);
    await Promise.resolve();

    expect(cartServiceSpy.createOrder).toHaveBeenCalledWith('accepted', cartItems);
    expect(cartServiceSpy.clearCart).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cart/payment-status'], {
      state: {
        cartData: acceptedOrder.items,
        paymentStatus: 'accepted',
        order: acceptedOrder,
      },
    });
    expect(component.isLoading).toBe(false);
    expect(toastSpy.show).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('deve registrar falha por saldo insuficiente e marcar pedido como recusado (caso negativo)', () => {
    const cartItems = [
      {
        id: 20,
        name: 'Carne de sol',
        image: 'img-2.png',
        price: 42.5,
        quantity: 1,
      },
    ];

    const refusedOrder = {
      id: 'order-2',
      orderCode: 'PEDFGHIJ',
      status: 'refused',
      deliveryStatus: 'Recebido',
      items: cartItems,
      createdAt: new Date().toISOString(),
    };

    component.data = cartItems;
    cartServiceSpy.createOrder.mockReturnValue(refusedOrder);

    component.redirectRefusePayment();

    expect(cartServiceSpy.createOrder).toHaveBeenCalledWith('refused', cartItems);
    expect(cartServiceSpy.clearCart).toHaveBeenCalledTimes(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cart/payment-status'], {
      state: {
        cartData: refusedOrder.items,
        paymentStatus: 'refused',
        order: refusedOrder,
      },
    });
    expect(component.isLoading).toBe(false);
    expect(toastSpy.show).not.toHaveBeenCalled();
  });
});
