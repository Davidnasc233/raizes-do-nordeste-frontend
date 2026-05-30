import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserStorageService } from '../../services/user-storage.service';
import { IUserProfile } from '../../models/user.model';
import { Observable } from 'rxjs';
import { IRewardItem, REWARDS } from '../../models/rewards.mock';

type LoyaltyLevel = {
  name: string;
  minPoints: number;
  benefit: string;
  icon: 'solid' | 'regular';
};

@Component({
  selector: 'app-loyalty',
  imports: [CommonModule],
  templateUrl: './loyalty.html',
  styleUrl: './loyalty.css',
})
export class Loyalty {
  user$: Observable<IUserProfile | null>;
  rewards: IRewardItem[] = [];

  levels: LoyaltyLevel[] = [
    {
      name: 'Cabocl@',
      minPoints: 0,
      benefit: '5% off em sobremesas',
      icon: 'regular',
    },
    {
      name: 'Sertanej@',
      minPoints: 250,
      benefit: '10% off + frete gratis',
      icon: 'regular',
    },
    {
      name: 'Vaqueir@',
      minPoints: 500,
      benefit: '15% off + sobremesa surpresa',
      icon: 'regular',
    },
  ];

  constructor(private userStorageService: UserStorageService) {
    this.user$ = this.userStorageService.user$;
    this.rewards = REWARDS;
  }

  get userPoints(): number {
    return this.userStorageService.getCurrentUser()?.points ?? 0;
  }

  get userOrdersCount(): number {
    return this.userStorageService.getCurrentUser()?.ordersCount ?? 0;
  }

  get currentLevel(): LoyaltyLevel {
    const current = [...this.levels].reverse().find((level) => this.userPoints >= level.minPoints);

    return current ?? this.levels[0];
  }

  get nextLevel(): LoyaltyLevel | null {
    return this.levels.find((level) => level.minPoints > this.userPoints) ?? null;
  }

  get progressPercentage(): number {
    const maxPoints = this.levels[this.levels.length - 1].minPoints;

    if (maxPoints <= 0) {
      return 0;
    }

    return Math.min((this.userPoints / maxPoints) * 100, 100);
  }

  get pointsToNextLevel(): number {
    if (!this.nextLevel) {
      return 0;
    }

    return this.nextLevel.minPoints - this.userPoints;
  }
}
