export interface IMenuItem {
  id: number;
  name: string;
  image: string;
  tag?: string;
  description: string;
  category: string;
  price?: number;
}

export type MenuItemCategory = 'dishes' | 'drinks' | 'desserts';

export interface IRestaurantUnit {
  id: number;
  name: string;
  address: string;
  menu: IMenuItem[];
}

export interface IRestaurantsResponse {
  unit: IRestaurantUnit[];
}
