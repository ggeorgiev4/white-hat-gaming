import { Component, EventEmitter, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Output('onCategoryChange') onCategoryChange = new EventEmitter<string>();

    public categories: Array<string> = [];
    public activeCategory: string = '';

    constructor(private appService: AppService) {
        this.categories = this.appService.getCategories();
        this.activeCategory = this.categories[0];
    }

    public categoryChange(category: string): void {
        this.activeCategory = category;
        this.onCategoryChange.emit(category);
    }
}
