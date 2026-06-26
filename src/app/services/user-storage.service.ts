import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserProfile } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  private readonly USER_STORAGE_KEY = 'app_user_profile';
  private readonly USERS_STORAGE_KEY = 'app_users';
  private readonly userSubject = new BehaviorSubject<IUserProfile | null>(this.loadCurrentUser());

  readonly user$: Observable<IUserProfile | null> = this.userSubject.asObservable();

  saveUser(user: IUserProfile): void {
    const users = this.getAllUsers();
    const userIndex = users.findIndex((currentUser) => currentUser.id === user.id);

    if (userIndex >= 0) {
      users[userIndex] = user;
    } else {
      users.push(user);
    }

    localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getCurrentUser(): IUserProfile | null {
    return this.userSubject.value;
  }

  getAllUsers(): IUserProfile[] {
    const storedUsers = localStorage.getItem(this.USERS_STORAGE_KEY);

    if (!storedUsers) {
      const legacyUser = this.loadLegacyUser();

      if (!legacyUser) {
        return [];
      }

      const migratedUsers = [legacyUser];
      localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(migratedUsers));
      return migratedUsers;
    }

    try {
      const parsedUsers = JSON.parse(storedUsers);

      if (!Array.isArray(parsedUsers)) {
        return [];
      }

      return parsedUsers.filter((user) => this.isValidUserProfile(user));
    } catch {
      return [];
    }
  }

  clearUser(): void {
    localStorage.removeItem(this.USER_STORAGE_KEY);
    this.userSubject.next(null);
  }

  private loadCurrentUser(): IUserProfile | null {
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

  private loadLegacyUser(): IUserProfile | null {
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
