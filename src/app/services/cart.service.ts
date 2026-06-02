import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICartItem } from '../models/cart-item.model';
import { IOrder, OrderStatus } from '../models/order.model';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly ORDERS_STORAGE_KEY = 'orders';
  private readonly DELIVERY_FEE = 7.9;
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>([]);
  private ordersSubject = new BehaviorSubject<IOrder[]>(this.loadOrders());

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

  constructor(private readonly userStorageService: UserStorageService) {}

  addToCart(product: Omit<ICartItem, 'quantity'>): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find((item) => item.id === product.id);
    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      this.cartItemsSubject.next([...currentItems, { ...product, quantity: 1 }]);
    }
  }

  updateQuantity(id: number, quantity: number): void {
    let updatedCart = this.cartItemsSubject.value.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    updatedCart = updatedCart.filter((item) => item.quantity > 0);
    this.cartItemsSubject.next(updatedCart);
  }

  removeFromCart(id: number): void {
    this.updateQuantity(id, 0);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  createOrder(status: OrderStatus, items: ICartItem[] = this.cartItemsSubject.value): IOrder {
    const order: IOrder = {
      id: this.generateOrderId(),
      orderCode: this.generateOrderCode(),
      status,
      deliveryStatus: 'Recebido',
      items: items.map((item) => ({ ...item })),
      createdAt: new Date().toISOString(),
    };
    const updatedOrders = [order, ...this.ordersSubject.value];
    this.ordersSubject.next(updatedOrders);
    this.saveOrders(updatedOrders);
    if(status === 'accepted') {
      this.incrementUserOrdersCount();
    }
    return order;
  }

  private incrementUserOrdersCount(): void {
    const currentUser = this.userStorageService.getCurrentUser();

    if (!currentUser) {
      return;
    }

    this.userStorageService.saveUser({
      ...currentUser,
      points: currentUser.points + 100,
      ordersCount: currentUser.ordersCount + 1,
      updatedAt: new Date().toISOString(),
    });
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

  calculateOrdersTotalValue(order: IOrder): Observable<number> {
    return this.orders$.pipe(
      map((orders) => {
        const currentOrder = orders.find((current) => current.id === order.id);

        if (!currentOrder) {
          return 0;
        }

        const itemsTotal = currentOrder.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );

        return itemsTotal + this.DELIVERY_FEE;
      }),
    );
  }

  get lastOrder$(): Observable<IOrder | undefined> {
    return this.orders$.pipe(map((orders) => orders[0]));
  }

  get lastOrderValue(): IOrder | undefined {
    return this.ordersSubject.value[0];
  }
}
