import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { IsInActiveCategoryPipe } from './pipes/is-in-active-category.pipe';
import { HasJackpotPipe } from './pipes/has-jackpot.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameCardComponent,
    IsInActiveCategoryPipe,
    HasJackpotPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
