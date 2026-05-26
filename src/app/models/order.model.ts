import { ICartItem } from './cart-item.model';

export type OrderStatus = 'accepted' | 'refused';

export interface IOrder {
  id: string;
  orderCode: string;
  status: OrderStatus;
  deliveryStatus: string;
  items: ICartItem[];
  createdAt: string;
}
