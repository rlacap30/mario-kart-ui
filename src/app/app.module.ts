import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SelectPlayerComponent } from './select-player/select-player.component';
import { GameInizializationComponent } from './game-inizialization/game-inizialization.component';
import { GameLoadingComponent } from './game-loading/game-loading.component';
import { GameComponent } from './game/game.component';
import { EndComponent } from './end/end.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SelectPlayerComponent,
    GameInizializationComponent,
    GameLoadingComponent,
    GameComponent,
    EndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      radius: 50,
      outerStrokeWidth: 8,
      innerStrokeWidth: 0,
      outerStrokeColor: "#2980b9",
      innerStrokeColor: "#00FFFFFF",
      animationDuration: 300,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
