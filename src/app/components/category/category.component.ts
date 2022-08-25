import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, Subject, Subscription, takeUntil } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Game } from 'src/app/models/game.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    public activeCategory: string;
    public games: Array<Game>;
    public destroy$: Subject<boolean> = new Subject();

    constructor(private appService: AppService,
                private route: ActivatedRoute) {
        this.games = this.appService.getGames();
        
        this.appService.categoryChanged
            .pipe(takeUntil(this.destroy$))
            .pipe(distinctUntilChanged())
            .subscribe((category: string) => {
                this.activeCategory = category;
        });
    }

    ngOnInit(): void {
        if (!this.activeCategory) {
            this.appService.updateCategory(this.route.snapshot.params['name'])
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
