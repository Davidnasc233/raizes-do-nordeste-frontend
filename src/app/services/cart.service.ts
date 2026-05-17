import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private mockCart: ICartItem[] = [];

  private cartItemsSubject: BehaviorSubject<ICartItem[]> = new BehaviorSubject<ICartItem[]>(this.mockCart);

  constructor() {}

  get items$(): Observable<ICartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  get totalItems$(): Observable<number> {
    return this.items$.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }

  addToCart(product: Omit<ICartItem, 'quantity'>): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      this.increaseQuantity(product.id);
    } else {
      const updatedCart = [...currentItems, { ...product, quantity: 1 }];
      this.updateCart(updatedCart);
    }
  }

  removeFromCart(id: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedCart = currentItems.filter(item => item.id !== id);
    this.updateCart(updatedCart);
  }

  increaseQuantity(id: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedCart = currentItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    this.updateCart(updatedCart);
  }

  decreaseQuantity(id: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedCart = currentItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    this.updateCart(updatedCart);
  }

  private updateCart(newCart: ICartItem[]): void {
    this.mockCart = newCart;
    this.cartItemsSubject.next(newCart);
  }

  clearCart(): void {
    this.updateCart([]);
  }
}