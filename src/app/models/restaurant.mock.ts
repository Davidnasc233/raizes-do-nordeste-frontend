import { MenuCategory } from '../shared/enum/category.enum';
import { MenuItem, RestaurantsResponse } from './restaurant-models';

export const BAHIA_COMMON_ITEMS: MenuItem[] = [
    {
        id: 1,
        name: 'Moqueca de Camarão',
        image: 'assets/images/moqueca.jpg',
        description: 'Tradicional moqueca baiana cozida no leite de coco e azeite de dendê.',
        price: 85,
        category: MenuCategory.DISHES,
    },
    {
        id: 2,
        name: 'Vatapá com Arroz e Caruru',
        image: 'assets/images/vatapa.jpg',
        description: 'Prato cremoso à base de pão, amendoim, castanha e camarão seco.',
        price: 45,
        category: MenuCategory.DISHES,
    },
    {
        id: 3,
        name: 'Bobó de Camarão',
        image: 'assets/images/bobo.jpg',
        description: 'Creme de macaxeira (mandioca) temperado com camarões e ervas frescas.',
        price: 75,
        category: MenuCategory.DISHES,
    },
    {
        id: 4,
        name: 'Suco de Cacau',
        image: 'assets/images/suco-cacau.jpg',
        description: 'Suco natural da fruta típica do sul da Bahia, refrescante e doce.',
        price: 12,
        category: MenuCategory.DRINKS,
    },
    {
        id: 5,
        name: 'Cocada Branca Cremosa',
        image: 'assets/images/cocada.jpg',
        description: 'Doce de coco tradicional com textura macia e caramelizada.',
        price: 10,
        category: MenuCategory.DESSERTS,
    },
    {
        id: 6,
        name: 'Acarajé',
        image: 'assets/images/Acarajé.jpg',
        description: 'Bolinho artesanal de feijão-fradinho frito no dendê, recheado com vatapá, caruru, salada e camarão seco.',
        price: 8,
        category: MenuCategory.DISHES,
    },
];

export const MOCK_RESTAURANTS: RestaurantsResponse = {
    unit: [
        {
            id: 1,
            name: 'Salvador - BA',
            address: 'Av. Oceânica, 123 - Barra, Salvador - BA',
            menu: [...BAHIA_COMMON_ITEMS],
        },
        {
            id: 2,
            name: 'Aracaju - SE',
            address: 'Rua da Praia, 456 - Atalaia, Aracaju - SE',
            menu: [],
        },
        {
            id: 3,
            name: 'Recife - PE',
            address: 'Rua Boa Viagem, 321 - Boa Viagem, Recife - PE',
            menu: [],
        },
        {
            id: 4,
            name: 'Maceió - AL',
            address: 'Av. Álvaro Otacílio, 789 - Ponta Verde, Maceió - AL',
            menu: [],
        },
    ],
};