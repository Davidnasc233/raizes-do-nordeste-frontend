import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  get hasLgpdConsent(): boolean {
    return localStorage.getItem('user_lgpd_consent') === 'true';
  }
  
  revokeLgpdConsent(): void {
    localStorage.removeItem('user_lgpd_consent');
  }
}
