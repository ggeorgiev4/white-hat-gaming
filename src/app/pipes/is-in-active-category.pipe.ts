import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from '../app.service';
import { Game } from '../models/game.model';

@Pipe({
  name: 'isInActiveCategory'
})
export class IsInActiveCategoryPipe implements PipeTransform {

    constructor(private appService: AppService) {}

    transform(game: Game, activeCategory: string): boolean {
        switch(activeCategory) {
            case 'other': {
                const filteredArray = game.categories.filter(value => this.appService.otherCategories.includes(value));
                
                return filteredArray.length > 0;
            }
            default: {
                return game.categories.includes(activeCategory);
            }
        }
    }
}
