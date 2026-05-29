import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserProfile } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  private readonly USER_STORAGE_KEY = 'app_user_profile';
  private readonly userSubject = new BehaviorSubject<IUserProfile | null>(this.loadUser());

  readonly user$: Observable<IUserProfile | null> = this.userSubject.asObservable();

  saveUser(user: IUserProfile): void {
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getCurrentUser(): IUserProfile | null {
    return this.userSubject.value;
  }

  clearUser(): void {
    localStorage.removeItem(this.USER_STORAGE_KEY);
    this.userSubject.next(null);
  }

  private loadUser(): IUserProfile | null {
    const storedUser = localStorage.getItem(this.USER_STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      return this.isValidUserProfile(parsedUser) ? parsedUser : null;
    } catch {
      return null;
    }
  }

  private isValidUserProfile(data: unknown): data is IUserProfile {
    if (!data || typeof data !== 'object') {
      return false;
    }

    const user = data as Record<string, unknown>;

    return (
      typeof user['id'] === 'string' &&
      typeof user['name'] === 'string' &&
      typeof user['email'] === 'string' &&
      typeof user['points'] === 'number' &&
      typeof user['ordersCount'] === 'number' &&
      typeof user['updatedAt'] === 'string'
    );
  }
}
