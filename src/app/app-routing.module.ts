import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SelectPlayerComponent } from './select-player/select-player.component';
import { GameInizializationComponent } from './game-inizialization/game-inizialization.component';
import { GameLoadingComponent } from './game-loading/game-loading.component';
import { GameComponent } from './game/game.component';
import { EndComponent } from './end/end.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'select-player', component: SelectPlayerComponent },
  { path: 'game-init', component: GameInizializationComponent },
  { path: 'game-loading', component: GameLoadingComponent },
  { path: 'game', component: GameComponent },
  { path: 'end', component: EndComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
