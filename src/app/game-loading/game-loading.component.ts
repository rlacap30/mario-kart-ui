import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-loading',
  templateUrl: './game-loading.component.html',
  styleUrls: ['./game-loading.component.css']
})
export class GameLoadingComponent implements OnInit, OnDestroy {
  progress: number = 0;
  timer: number = 10;
  private timerInterval: any;
  gameId: string = '';
  private inactiveSessionSubscription: Subscription | undefined;
  private deleteSessionSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnDestroy() {
    if (this.inactiveSessionSubscription) {
      this.inactiveSessionSubscription.unsubscribe();
    }

    if (this.deleteSessionSubscription) {
      this.deleteSessionSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.startTimer();
    const state = history.state;

    if(state && state['id']) {
      this.gameId = state['id'];
      this.updateGameSession();
    }
  }

  startTimer() {
    const initialTime = this.timer; 
    this.timerInterval = setInterval(() => {
      this.timer--;

      this.progress = (1 - this.timer / initialTime) * 100;

      if (this.timer === 0) {
        clearInterval(this.timerInterval);
        this.progress = 100;
        this.deleteSessionSubscription = this.http.delete(`${environment.apiUrl}/GameSession/delete-active-session`).subscribe(() => {
            setTimeout(() => {
              this.router.navigate(['/game']);
            }, 2000);
        });
      }
    }, 1000);
  }

  updateGameSession() {
    const url = `${environment.apiUrl}/GameSession?id=${this.gameId}`;

    this.inactiveSessionSubscription = this.http.patch(url, {}).subscribe(
      () => {
        console.log('Game session updated successfully');
      },
      error => {
        console.error('Error updating game session:', error);
      }
    );
  }
}
