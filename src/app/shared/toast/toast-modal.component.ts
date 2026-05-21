import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-modal',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './toast-modal.component.html',
  styleUrls: ['./toast-modal.component.css'],
})
export class ToastModalComponent {

  constructor(
    public toastService: ToastService
  ) {}
}
