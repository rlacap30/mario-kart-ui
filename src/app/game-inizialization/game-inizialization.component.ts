import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-inizialization',
  templateUrl: './game-inizialization.component.html',
  styleUrls: ['./game-inizialization.component.css']
})
export class GameInizializationComponent implements OnInit {
  gameId: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const state = history.state;
    if(state && state['id']) {
      this.gameId = state['id'];
    }

    setTimeout(() => {
      this.router.navigate(['/game-loading'], { state: { id: this.gameId } });
    }, 5000);
  }
}
