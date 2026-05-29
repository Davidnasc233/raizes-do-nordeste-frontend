export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  isLogged: boolean;
  points: number;
  ordersCount: number;
  updatedAt: string;
}
