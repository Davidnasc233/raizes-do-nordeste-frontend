import { Component, OnInit } from '@angular/core';
import { IPromotionItem, PROMOTIONS } from '../../../models/promotions.mock';

@Component({
  selector: 'app-promotion-notification',
  imports: [],
  templateUrl: './promotion-notification.html',
  styleUrl: './promotion-notification.css',
})
export class PromotionNotification implements OnInit{
  promotionItems: IPromotionItem[] = []

  ngOnInit() {
    this.promotionItems = PROMOTIONS
  }
}
