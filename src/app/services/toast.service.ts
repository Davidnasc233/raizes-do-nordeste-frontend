import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'danger' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(text: string, type: 'success' | 'danger' | 'warning' = 'success') {
    const currentToasts = this.toastsSubject.value;
    const id = Date.now();
    
    this.toastsSubject.next([...currentToasts, { id, text, type }]);

    setTimeout(() => {
      this.clear(id);
    }, 3000);
  }

  clear(id: number) {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter((t) => t.id !== id));
  }
}