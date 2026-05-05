import { MenuItem, RestaurantsResponse } from './restaurant-models';

export const BAHIA_COMMON_ITEMS: MenuItem[] = [
    {
        id: 101,
        name: 'Moqueca de Camarão',
        image: 'assets/images/moqueca.jpg',
        description: 'Tradicional moqueca baiana cozida no leite de coco e azeite de dendê.',
        price: 85.0,
        category: 'dishes',
    },
    {
        id: 102,
        name: 'Vatapá com Arroz e Caruru',
        image: 'assets/images/vatapa.jpg',
        description: 'Prato cremoso à base de pão, amendoim, castanha e camarão seco.',
        price: 45.0,
        category: 'dishes',
    },
    {
        id: 103,
        name: 'Bobó de Camarão',
        image: 'assets/images/bobo.jpg',
        description: 'Creme de macaxeira (mandioca) temperado com camarões e ervas frescas.',
        price: 75.0,
        category: 'dishes',
    },
    {
        id: 104,
        name: 'Suco de Cacau',
        image: 'assets/images/suco-cacau.jpg',
        description: 'Suco natural da fruta típica do sul da Bahia, refrescante e doce.',
        price: 12.0,
        category: 'drinks',
    },
    {
        id: 105,
        name: 'Cocada Branca Cremosa',
        image: 'assets/images/cocada.jpg',
        description: 'Doce de coco tradicional com textura macia e caramelizada.',
        price: 10.0,
        category: 'desserts',
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