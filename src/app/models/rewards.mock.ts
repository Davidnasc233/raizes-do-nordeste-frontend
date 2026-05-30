export interface IRewardItem {
    id: number;
    title: string;
    points: string;
}

export const REWARDS: IRewardItem[] = [
    {
        id: 1,
        title: 'Cocada Cremosa grátis',
        points: '80 pts'
    },
    {
        id: 1,
        title: 'Caipirinha cortesia',
        points: '120 pts'
    },
    {
        id: 1,
        title: '20% off no próximo pedido',
        points: '200 pts'
    }
]