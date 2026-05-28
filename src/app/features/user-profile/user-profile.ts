import { Component } from '@angular/core';
import { ValidateLgpdService } from '../../services/validate-lgpd-consent.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [AsyncPipe],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  hasAcceptedLgpd$!: Observable<boolean | null>;

  constructor(private validateLgpdService: ValidateLgpdService) {}

  ngOnInit() {
    this.hasAcceptedLgpd$ = this.validateLgpdService.lgpdConsent$;
  }

  revokeLgpdConsent(): void {
    this.validateLgpdService.refuseLgpd();
  }

  deleteAllData() {
    localStorage.clear();
  }
}
