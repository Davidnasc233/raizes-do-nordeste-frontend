import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICartItem } from '../models/cart-item.model';
import { IOrder, OrderStatus } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly ORDERS_STORAGE_KEY = 'orders';
  private mockCart: ICartItem[] = [];
  private ordersSubject = new BehaviorSubject<IOrder[]>(this.loadOrders());

  private cartItemsSubject: BehaviorSubject<ICartItem[]> = new BehaviorSubject<ICartItem[]>(
    this.mockCart,
  );
  private latestOrderCodeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get latestOrderCode$(): Observable<string> {
    return this.latestOrderCodeSubject.asObservable();
  }

  constructor() {}

  get items$(): Observable<ICartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  get totalItems$(): Observable<number> {
    return this.items$.pipe(map((items) => items.reduce((sum, item) => sum + item.quantity, 0)));
  }

  get totalValue$(): Observable<number> {
    return this.items$.pipe(
      map((items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)),
    );
  }

  get orders$(): Observable<IOrder[]> {
    return this.ordersSubject.asObservable();
  }

  addToCart(product: Omit<ICartItem, 'quantity'>): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      this.increaseQuantity(product.id);
    } else {
      const updatedCart = [...currentItems, { ...product, quantity: 1 }];
      this.updateCart(updatedCart);
    }
  }

  removeFromCart(id: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedCart = currentItems.filter((item) => item.id !== id);
    this.updateCart(updatedCart);
  }

  increaseQuantity(id: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedCart = currentItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    this.updateCart(updatedCart);
  }

  decreaseQuantity(id: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedCart = currentItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    this.updateCart(updatedCart);
  }

  private updateCart(newCart: ICartItem[]): void {
    this.mockCart = newCart;
    this.cartItemsSubject.next(newCart);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  createOrder(status: OrderStatus, items: ICartItem[] = this.cartItemsSubject.value): IOrder {
    const order: IOrder = {
      id: this.generateOrderId(),
      orderCode: this.generateOrderCode(),
      status,
      deliveryStatus: 'Recebido',
      items: this.cloneItems(items),
      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [order, ...this.ordersSubject.value];
    this.ordersSubject.next(updatedOrders);
    this.latestOrderCodeSubject.next(order.orderCode);
    this.saveOrders(updatedOrders);

    return order;
  }

  getLatestOrderByStatus(status: OrderStatus): IOrder | null {
    return this.ordersSubject.value.find((order) => order.status === status) ?? null;
  }

  private loadOrders(): IOrder[] {
    const storedOrders = localStorage.getItem(this.ORDERS_STORAGE_KEY);

    if (!storedOrders) {
      return [];
    }

    try {
      const parsedOrders = JSON.parse(storedOrders) as IOrder[];
      return Array.isArray(parsedOrders) ? parsedOrders : [];
    } catch {
      return [];
    }
  }

  private saveOrders(orders: IOrder[]): void {
    localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }

  private cloneItems(items: ICartItem[]): ICartItem[] {
    return items.map((item) => ({ ...item }));
  }

  private generateOrderId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  }

  private generateOrderCode(): string {
    const caracteres = '23456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
    let randomPart = '';

    for (let i = 0; i < 5; i++) {
      const indexAleatorio = Math.floor(Math.random() * caracteres.length);
      randomPart += caracteres.charAt(indexAleatorio);
    }

    return `PED${randomPart}`;
  }

  updateLastOrderStatus(currentLabel: string) {
    const currentOrders = this.ordersSubject.getValue();

    if (currentOrders && currentOrders.length > 0) {
      const updatedOrders = currentOrders.map((order, index) => {
        if (index === 0) {
          return {
            ...order,
            deliveryStatus: currentLabel,
          };
        }
        return order;
      });

      this.ordersSubject.next(updatedOrders);
      this.saveOrders(updatedOrders);
    }
  }

  get lastOrder$(): Observable<IOrder | undefined> {
    return this.orders$.pipe(
      map(orders => orders.length > 0 ? orders[0] : undefined)
    );
  }

  get lastOrderValue(): IOrder | undefined {
    const orders = this.ordersSubject.getValue();
    return orders.length > 0 ? orders[0] : undefined;
  }
}
