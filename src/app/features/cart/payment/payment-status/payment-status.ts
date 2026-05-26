import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ICartItem } from '../../../../models/cart-item.model';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { RestaurantAddressService } from '../../../../services/restaurant-address.service';
import { RestaurantUnit } from '../../../../models/restaurant-models';
import { OrderStatusStep } from './interface/order-status-step.interface';
import { CartService } from '../../../../services/cart.service';
import { IOrder } from '../../../../models/order.model';

@Component({
  selector: 'app-payment-status',
  imports: [CurrencyPipe, AsyncPipe, CommonModule],
  templateUrl: './payment-status.html',
  styleUrls: ['./payment-status.css'],
})
export class PaymentStatusComponent implements OnInit, OnDestroy {
  items: ICartItem[] = [];
  subtotal = 0;
  total = 0;
  readonly deliveryFee = 7.9;
  selectedUnit$!: Observable<RestaurantUnit | null>;
  orderStatus: string = '';
  private intervalId: any;
  currentStepIndex = 0;
  cartOrder$!: Observable<IOrder | undefined>;

  statusSteps: OrderStatusStep[] = [
    { id: 1, label: 'Recebido', iconClass: 'fa-check', subtitle: 'Atualizando em tempo real...', isCompleted: true, isActive: true },
    { id: 2, label: 'Em preparo', iconClass: 'fa-utensils', isCompleted: false, isActive: false },
    { id: 3, label: 'Pronto', iconClass: 'fa-box-open', isCompleted: false, isActive: false },
    { id: 4, label: 'Entregue', iconClass: 'fa-truck', isCompleted: false, isActive: false }
  ];

  constructor(
    private router: Router,
    private cartService: CartService,
    private restaurantAddressService: RestaurantAddressService,
    private cdr: ChangeDetectorRef
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state && navigation.extras.state['cartData']) {
      this.items = navigation.extras.state['cartData'];
      this.orderStatus = navigation.extras.state['paymentStatus']
    }
    this.cartOrder$ = this.cartService.orders$.pipe(
      map(orders => orders.length > 0 ? orders[orders.length - 1] : undefined)
    );
    this.selectedUnit$ = this.restaurantAddressService.selectedUnit$;
  }

  ngOnInit() {
    this.subtotal = this.calculateItemsTotal(this.items);
    this.total = this.subtotal + this.deliveryFee;
    this.cartService.orders$.pipe(take(1)).subscribe(orders => {
      if (orders && orders.length > 0) {
        const currentStatus = orders[0].deliveryStatus;
        
        const savedIndex = this.statusSteps.findIndex(step => step.label === currentStatus);
        
        if (savedIndex >= this.statusSteps.length - 1) {
          this.updateSteps(savedIndex);
        } else {
          this.currentStepIndex = savedIndex !== -1 ? savedIndex : 0;
          this.startOrderSimulation();
        }
      } else {
        this.startOrderSimulation();
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startOrderSimulation() {
    const lastOrder = this.cartService.lastOrderValue;
    
    if (lastOrder && lastOrder.deliveryStatus) {
      const savedIndex = this.statusSteps.findIndex(
        (step) => step.label.toLowerCase() === lastOrder.deliveryStatus.toLowerCase()
      );
  
      if (savedIndex !== -1) {
        if (savedIndex >= this.statusSteps.length - 1) {
          this.currentStepIndex = savedIndex;
          this.updateSteps(this.currentStepIndex);
          this.statusSteps[savedIndex].isCompleted = true;
          this.statusSteps[savedIndex].isActive = false;
          this.cdr.detectChanges();
          return;
        }
        
        this.currentStepIndex = savedIndex;
      } else {
        this.currentStepIndex = 0;
      }
    } else {
      this.currentStepIndex = 0;
    }
  
    this.updateSteps(this.currentStepIndex);
  
    this.intervalId = setInterval(() => {
      this.currentStepIndex++;
  
      if (this.currentStepIndex < this.statusSteps.length) {
        this.updateSteps(this.currentStepIndex);
      } else {
        this.statusSteps[this.currentStepIndex - 1].isCompleted = true;
        this.statusSteps[this.currentStepIndex - 1].isActive = false;
        this.cartService.updateLastOrderStatus(this.statusSteps[this.statusSteps.length - 1].label);
        
        clearInterval(this.intervalId);
        this.cdr.detectChanges();
      }
    }, 5000);
  }

  updateSteps(activeIndex: number) {
    let currentLabel = '';

    this.statusSteps.forEach((step, index) => {
      if (index < activeIndex) {
        step.isCompleted = true;
        step.isActive = false;
      } else if (index === activeIndex) {
        step.isCompleted = false;
        step.subtitle = 'Atualizando em tempo real...';
        step.isActive = true;
        currentLabel = step.label;
      } else {
        step.isCompleted = false;
        step.isActive = false;
      }
    });

    if (currentLabel) {
      this.cartService.updateLastOrderStatus(currentLabel);
    }

    this.cdr.detectChanges();
  }

  private calculateItemsTotal(items: ICartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
