import { Component, OnInit } from '@angular/core';
import { ValidateLgpdService } from '../../services/validate-lgpd-consent.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lgpd-modal',
  imports: [AsyncPipe],
  templateUrl: './lgpd-modal.html',
  styleUrls: ['./lgpd-modal.css'],
})
export class LgpdModalComponent implements OnInit {
  hasAccepted$!: Observable<Boolean | null>;

  constructor(private validateLgpdService: ValidateLgpdService) {}

  ngOnInit(): void {
    this.hasAccepted$ = this.validateLgpdService.lgpdConsent$;
    this.validateLgpdService.getLgpd();
  }

  accept(): void {
    this.validateLgpdService.setLgpd();
  }

  refuse(): void {
    this.validateLgpdService.refuseLgpd();
  }
}
