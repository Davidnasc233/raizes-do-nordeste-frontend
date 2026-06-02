import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';


@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  constructor(private navigationService: NavigationService) {}

  redirectTo(route: string): void {
    this.navigationService.navigateTo(route);
  }
}
