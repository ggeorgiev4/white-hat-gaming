import { Injectable } from '@angular/core';
import { Game } from './models/game.model';

import GAMES from '../../src/games.json';
import JACKPOTS from '../../src/jackpots.json';
import { Jackpot } from './models/jackpot.model';
import { Subject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
    private jackpots: Array<Jackpot>;
    private subscription: Subscription;

    public otherCategories = ['fun', 'virtual', 'ball'];
    public jackpotsUpdated: Subject<boolean> = new Subject();
    public categoryChanged: Subject<string> = new Subject();

    constructor() {
        this.jackpots = JACKPOTS;
        this.increaseJackpotsOverTime();
    }

    public getGames(): Array<Game> {
        return GAMES;
    }

    public getJackpots(): Array<Jackpot> {
        return this.jackpots;
    }

    public updateCategory(category: string): void {
        this.categoryChanged.next(category);
    }

    public getCategories(): Array<string> {
        const categories: Array<string> = [];

        GAMES.forEach((game: Game) => {
            game.categories.forEach((category: string) => {
                if (!categories.includes(category) && !this.otherCategories.includes(category)) {
                    categories.push(category);
                }
            })
        });

        categories.push('other')

        return categories;
    }

    private increaseJackpotsOverTime(): void {
        this.subscription = interval(3000).subscribe(() => {
            this.jackpots.forEach((j: Jackpot) => j.amount += Math.floor(Math.random() * (5000 - 1000 + 1) + 1000));
            this.jackpotsUpdated.next(true);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
