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

  logout() {
    const user = this.userStorageService.getCurrentUser();
    if (user) {
      const loggedUser = { ...user, isLogged: false };
      this.userStorageService.saveUser(loggedUser);
    }
    this.router.navigate(['/login']);
  }

  deleteAllData() {
    this.userStorageService.clearUser();
    localStorage.removeItem('user_lgpd_consent');
    localStorage.removeItem('orders');
  }
}
