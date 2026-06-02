export interface IPromotionItem {
    id: number;
    tag: string;
    title: string;
    description: string;
}

export const PROMOTIONS: IPromotionItem[] = [
    {
        id: 1,
        tag: 'SEXTAS',
        title: 'Sexta do Sertão',
        description: '20% off das 18h às 22h.'
    },
    {
        id: 1,
        tag: 'COMBO',
        title: 'Combo Família',
        description: '2 Pratos + 2 Bebidas por R$ 89,90.'
    },
    {
        id: 1,
        tag: 'FIDELIDADE',
        title: 'Dobro de pontos',
        description: 'Pedidos acima de R$ 80 ganham 2x pontos no Fidelidade.'
    }
]