import { TestBed } from '@angular/core/testing';

import { ValidateLgpdService } from './validate-lgpd-consent.service';

describe('ValidateLgpdService', () => {
  let service: ValidateLgpdService;

  beforeEach(() => {
    localStorage.removeItem('user_lgpd_consent');

    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateLgpdService);
  });

  afterEach(() => {
    localStorage.removeItem('user_lgpd_consent');
  });

  it('deve revogar consentimento da LGPD (caso positivo)', () => {
    let latestConsent: boolean | null = null;

    service.lgpdConsent$.subscribe((consent) => {
      latestConsent = consent;
    });

    service.setLgpd();
    service.refuseLgpd();

    expect(service.getLgpd()).toBe('false');
    expect(localStorage.getItem('user_lgpd_consent')).toBe('false');
    expect(latestConsent).toBe(false);
  });
});
