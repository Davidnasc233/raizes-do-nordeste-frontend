import { MenuCategory } from '../shared/enum/category.enum';
import { MenuItem, RestaurantsResponse } from './restaurant-models';

export const BAHIA_COMMON_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Moqueca de Camarão',
    image: 'images/moqueca-de-camarao.jpg',
    description: 'Tradicional moqueca baiana cozida no leite de coco e azeite de dendê.',
    price: 85,
    category: MenuCategory.DISHES,
  },
  {
    id: 2,
    name: 'Vatapá com Arroz e Caruru',
    image: 'images/vatapa-com-arroz.webp',
    description: 'Prato cremoso à base de pão, amendoim, castanha e camarão seco.',
    price: 45,
    category: MenuCategory.DISHES,
  },
  {
    id: 3,
    name: 'Suco de Cacau',
    image: 'images/suco-de-cacau.jpg',
    description: 'Suco natural da fruta típica do sul da Bahia, refrescante e doce.',
    price: 12,
    category: MenuCategory.DRINKS,
  },
  {
    id: 4,
    name: 'Cocada Branca Cremosa',
    image: 'images/cocada-branca.jpg',
    description: 'Doce de coco tradicional com textura macia e caramelizada.',
    price: 10,
    category: MenuCategory.DESSERTS,
  },
  {
    id: 5,
    name: 'Acarajé',
    image: 'images/acaraje.jpg',
    description:
      'Bolinho de feijão frito no dendê, recheado com vatapá, caruru, salada e camarão seco.',
    price: 8,
    category: MenuCategory.DISHES,
  },
];

export const SERGIPE_COMMON_ITEMS: MenuItem[] = [
    {
      id: 1,
      name: 'Aratu na Palha',
      image: 'images/aratu-na-palha.webp',
      description: 'Delicioso aratu catado, temperado com ervas e leite de coco, assado na folha de bananeira. Uma explosão de sabor e perfume.',
      category: MenuCategory.DISHES,
      price: 68
    },
    {
      id: 2,
      name: 'Camarão de Cueca',
      image: 'images/camarao-de-cueca.jpg',
      description: 'Camarões empanados na tapioca e coco ralado, servidos com um inusitado "anel" de queijo coalho grelhado na calda de mel de engenho.',
      category: MenuCategory.DISHES,
      price: 74
    },
    {
      id: 3,
      name: 'Sarapatel',
      image: 'images/sarapatel.jpg',
      description: 'Prato tradicional de miúdos de porco e sangue coagulado, cozido lentamente com especiarias e hortelã. Acompanha farinha de mandioca e arroz branco.',
      category: MenuCategory.DISHES,
      price: 55
    },
    {
      id: 4,
      name: 'Pé de Moleque',
      image: 'images/pe-de-moleque.jpg',
      description: 'Doce tradicional nordestino feito de massa de puba (mandioca fermentada), coco ralado, rapadura, cravo e canela. Textura firme e aroma inconfundível.',
      category: MenuCategory.DESSERTS,
      price: 18
    },
    {
      id: 5,
      name: 'Meladinha',
      image: 'images/meladinha.jpg',
      description: 'Uma dose da nossa cachaça artesanal envelhecida, suavemente adocicada com melado de cana e um toque de limão.',
      category: MenuCategory.DRINKS,
      price: 12
    }
  ];

  export const PERNAMBUCO_COMMON_ITEMS: MenuItem[] = [
    {
        id: 1,
        name: 'Carne de Sol com Macaxeira',
        image: 'images/carne-de-sol.jpg',
        description: 'Carne de sol artesanal acebolada, grelhada na manteiga de garrafa, acompanhada de macaxeira bem macia (frita ou cozida).',
        category: MenuCategory.DISHES,
        price: 52
    },
    {
        id: 2,
        name: 'Buchada de Bode',
        image: 'images/buchada.webp',
        description: 'Tradicional iguaria nordestina feita com miúdos de bode cozidos e temperados no capricho, servida bem quente com pirão e arroz.',
        category: MenuCategory.DISHES,
        price: 58
    },
    {
        id: 3,
        name: 'Baião de Dois',
        image: 'images/baiao-de-dois.webp',
        description: 'Mistura clássica e cremosa de arroz, feijão de corda, queijo coalho grelhado, bacon, carne seca desfiada e cheiro-verde.',
        category: MenuCategory.DISHES,
        price: 45
    },
    {
        id: 4,
        name: 'Bolo de Noiva Pernambucano',
        image: 'images/bolo-de-noiva.jpg',
        description: 'O tradicional bolo de festa pernambucano, feito à base de ameixa, passas, frutas cristalizadas e um toque marcante de vinho.',
        category: MenuCategory.DESSERTS,
        price: 22
    },
    {
        id: 5,
        name: 'Pitú',
        image: 'images/pitu.avif',
        description: 'Dose da clássica e tradicional cachaça pernambucana da latinha branca, perfeita para acompanhar os pratos pesados.',
        category: MenuCategory.DRINKS,
        price: 10
    }
];

export const ALAGOAS_COMMON_ITEMS: MenuItem[] = [
    {
        id: 12,
        name: 'Sururu ao Coco',
        image: 'images/sururu-ao-coco.jpg',
        description: 'O clássico molusco das lagoas alagoanas, cozido com leite de coco fresco, verduras picadinhas, coentro e um toque de azeite de dendê.',
        category: MenuCategory.DISHES,
        price: 48
    },
    {
        id: 13,
        name: 'Peixada Alagoana',
        image: 'images/peixada-alagoana.jpg',
        description: 'Postas de peixe fresco cozidas em um delicioso caldo temperado com leite de coco e legumes. Acompanha pirão cremoso e arroz branco.',
        category: MenuCategory.DISHES,
        price: 65
    },
    {
        id: 14,
        name: 'Passaporte',
        image: 'images/passaporte.jfif',
        description: 'O clássico cachorro-quente de Maceió! Pão seda recheado com carne moída bem temperada, salsicha, tomate picado, milho, ervilha, maionese artesanal e queijo ralado.',
        category: MenuCategory.DISHES,
        price: 18
    },
    {
        id: 15,
        name: 'Cocada da Massagueira',
        image: 'images/cocada-massagueira.jpg',
        description: 'Inspirada nas famosas cocadas do maior polo gastronômico de Alagoas. Uma cocada artesanal super cremosa, servida morna e feita com coco puro.',
        category: MenuCategory.DESSERTS,
        price: 14
    },
    {
        id: 16,
        name: 'Aluá',
        image: 'images/alua.webp',
        description: 'Bebida fermentada tradicional de origem indígena, preparada de forma artesanal com casca de abacaxi, gengibre, cravo e adoçada com rapadura.',
        category: MenuCategory.DRINKS,
        price: 9
    }
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
      menu: [...SERGIPE_COMMON_ITEMS],
    },
    {
      id: 3,
      name: 'Recife - PE',
      address: 'Rua Boa Viagem, 321 - Boa Viagem, Recife - PE',
      menu: [...PERNAMBUCO_COMMON_ITEMS],
    },
    {
      id: 4,
      name: 'Maceió - AL',
      address: 'Av. Álvaro Otacílio, 789 - Ponta Verde, Maceió - AL',
      menu: [...ALAGOAS_COMMON_ITEMS],
    },
  ],
};
