import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ICartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart-items',
  imports: [CurrencyPipe],
  templateUrl: './cart-items.html',
  styleUrl: './cart-items.css',
})
export class CartItems {
  @Input() data: ICartItem[] = [];

  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() clear = new EventEmitter<void>();

  onIncrease(id: number) {
    this.increase.emit(id);
  }

  onDecrease(id: number) {
    this.decrease.emit(id);
  }

  onRemove(id: number) {
    this.remove.emit(id);
  }

  onClearCart() {
    this.clear.emit();
  }
}
