import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lgpd-modal',
  templateUrl: './lgpd-modal.html',
  styleUrls: ['./lgpd-modal.css'],
})
export class LgpdModalComponent implements OnInit {
  hasAccepted: boolean = false;
  private readonly COOKIE_KEY = 'user_lgpd_consent';

  ngOnInit(): void {
    const consent = localStorage.getItem(this.COOKIE_KEY);
    if (consent) {
      this.hasAccepted = true;
    }
  }

  accept(): void {
    localStorage.setItem(this.COOKIE_KEY, 'true');
    this.hasAccepted = true;
  }

  refuse(): void {
    this.hasAccepted = true;
  }
}
