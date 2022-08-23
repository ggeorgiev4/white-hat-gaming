import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Game } from './models/game.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public activeCategory: string;
    public games: Array<Game>;

    constructor(private appService: AppService) {
        this.games = this.appService.getGames();
    }
    
    ngOnInit(): void {
        this.activeCategory = this.appService.getCategories()[0];
    }

    categoryChanged(ev: string): void {
        this.activeCategory = ev;
    }
}
