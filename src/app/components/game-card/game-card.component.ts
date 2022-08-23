import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, map, of, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Game } from 'src/app/models/game.model';
import { Jackpot } from 'src/app/models/jackpot.model';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit, OnDestroy {

    @Input('game') game: Game;

    public jackpots: Array<Jackpot>;
    public updatePipe: number = 0;
    public hasJackpot: boolean;
    private subscription: Subscription;

    constructor(private appService: AppService) {
        this.jackpots = this.appService.getJackpots();
    }

    ngOnInit(): void {
        if (this.jackpots.find((j: Jackpot) => j.game === this.game.id)) {
            this.hasJackpot = true;
            this.subscribeForJackpotUpdate();
        }
    }

    private subscribeForJackpotUpdate(): void {
        this.subscription = this.appService.jackpotsUpdated
            .subscribe(() => {
                this.updatePipe++;
            });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
