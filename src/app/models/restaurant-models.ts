export interface MenuItem {
    id: number;
    name: string;
    image: string;
    tag?: string;
    description: string;
    category: string;
    price?: number;
}

export type MenuItemCategory = 'dishes' | 'drinks' | 'desserts';

export interface RestaurantUnit {
    id: number;
    name: string;
    address: string;
    menu: MenuItem[];
}

export interface RestaurantsResponse {
    unit: RestaurantUnit[];
}