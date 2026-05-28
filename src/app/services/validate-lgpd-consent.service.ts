import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidateLgpdService {
  private readonly COOKIE_KEY = 'user_lgpd_consent';
  private platformId = inject(PLATFORM_ID);

  private readonly lgpdConsentSub = new BehaviorSubject<boolean | null>(
    isPlatformBrowser(this.platformId) ? this.getStoredConsent() : null,
  );

  readonly lgpdConsent$: Observable<boolean | null> = this.lgpdConsentSub.asObservable();

  private getStoredConsent(): boolean | null {
    const storedConsent = localStorage.getItem(this.COOKIE_KEY);
    if (storedConsent === 'true') return true;
    if (storedConsent === 'false') return false;
    return null;
  }

  getLgpd(): string | null {
    const lgpd = localStorage.getItem('user_lgpd_consent');
    return lgpd;
  }

  setLgpd() {
    localStorage.setItem(this.COOKIE_KEY, 'true');
    this.lgpdConsentSub.next(true);
  }

  refuseLgpd() {
    localStorage.setItem(this.COOKIE_KEY, 'false');
    this.lgpdConsentSub.next(false);
  }
}
