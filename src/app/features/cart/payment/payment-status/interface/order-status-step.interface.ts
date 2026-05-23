export interface OrderStatusStep {
    id: number;
    label: string;
    iconClass: string;
    subtitle?: string;
    isCompleted: boolean;
    isActive: boolean;
  }