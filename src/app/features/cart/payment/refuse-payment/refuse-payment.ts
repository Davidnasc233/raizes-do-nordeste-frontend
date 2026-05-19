import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";


@Component({
  selector: 'app-refuse-payment',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './refuse-payment.html',
  styleUrls: ['./refuse-payment.css'],
})
export class RefusePaymentComponent {

}