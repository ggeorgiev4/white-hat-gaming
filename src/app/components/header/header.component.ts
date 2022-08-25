import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public categories: Array<string>;
    public activeCategory: string;
    public destroy$: Subject<boolean> = new Subject();

    constructor(private appService: AppService,
                private router: Router) {
        this.categories = this.appService.getCategories();
    }

    ngOnInit(): void {
        this.appService.categoryChanged
            .pipe(takeUntil(this.destroy$))
            .pipe(distinctUntilChanged())
            .subscribe((category: string) => {
                this.activeCategory = category;
        });
    }

    public categoryChange(category: string): void {
        this.activeCategory = category;
        this.appService.updateCategory(this.activeCategory);
        this.router.navigate([category]);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
