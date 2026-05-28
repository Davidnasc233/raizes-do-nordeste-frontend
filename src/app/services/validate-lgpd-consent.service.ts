import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidateLgpdService {
  private readonly lgpdConsentSub = new BehaviorSubject<boolean | null>(false);
  private readonly COOKIE_KEY = 'user_lgpd_consent';

  readonly lgpdConsent$: Observable<boolean | null> = this.lgpdConsentSub.asObservable();

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
