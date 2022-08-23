import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/game.model';
import { Jackpot } from '../models/jackpot.model';

@Pipe({
  name: 'jackpot'
})
export class HasJackpotPipe implements PipeTransform {
    transform(game: Game, jackpots: Array<Jackpot>, updatePipe?: number): boolean | string {
        const jackpot = jackpots.find((j: Jackpot)=> j.game === game.id);

        if (!jackpot) return false;

        return parseFloat(jackpot.amount.toString())
                .toString()
                .replace(/(\B(?=(\d{3})+(?!\d)))/g, " ");
    }
}
