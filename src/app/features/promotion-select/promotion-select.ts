import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-promotion-select',
  imports: [],
  templateUrl: './promotion-select.html',
  styleUrl: './promotion-select.css',
})
export class PromotionSelect {
  constructor(
    private readonly router: Router,
    private readonly navigationService: NavigationService
  ) {}

  redirectToPromotionPage() {
    this.navigationService.navigateTo('/promotion');
  }
}
