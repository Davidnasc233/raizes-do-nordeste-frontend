import { Component, inject } from '@angular/core';
import { ValidateLgpdService } from '../../services/validate-lgpd-consent.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUserProfile } from '../../models/user.model';
import { UserStorageService } from '../../services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  hasAcceptedLgpd$!: Observable<boolean | null>;
  user$!: Observable<IUserProfile | null>;

  constructor(
    private readonly validateLgpdService: ValidateLgpdService,
    private readonly userStorageService: UserStorageService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.hasAcceptedLgpd$ = this.validateLgpdService.lgpdConsent$;
    this.user$ = this.userStorageService.user$;
  }

  revokeLgpdConsent(): void {
    this.validateLgpdService.refuseLgpd();
  }

  deleteAllData() {
    this.userStorageService.clearUser();
    localStorage.removeItem('user_lgpd_consent');
    localStorage.removeItem('orders');
  }

  saveExampleUser(): void {
    this.userStorageService.saveUser({
      id: 'user-001',
      name: 'Visitante Raizes',
      email: 'visitante@raizes.com',
      password: 'password123',
      points: 120,
      ordersCount: 3,
      updatedAt: new Date().toISOString(),
    });
  }

  clearSavedUser(): void {
    this.userStorageService.clearUser();
  }
}
