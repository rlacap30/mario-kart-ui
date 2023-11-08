import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-select-player',
  templateUrl: './select-player.component.html',
  styleUrls: ['./select-player.component.css']
})
export class SelectPlayerComponent implements OnInit, OnDestroy {
  private activeSessionSubscription: Subscription | undefined;
  private interval: any;
  private timerInterval: any;
  private deleteSessionSubscription: Subscription | undefined;

  player1 = false;
  player2 = false;
  player3 = false;
  player4 = false;
  progressValue = 0;
  timer: number = 15;
  nrPlayers: number = 0;
  showWarning: boolean = false;
  sessionId: string = '';

  percent: number = 0;
  remainingTime: string = '15';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnDestroy() {
    if (this.activeSessionSubscription) {
      this.activeSessionSubscription.unsubscribe();
    }

    if (this.deleteSessionSubscription) {
      this.deleteSessionSubscription.unsubscribe();
    }

    clearInterval(this.interval);
    clearInterval(this.timerInterval);
  }

  ngOnInit() {
    this.startTimer();
    this.interval = setInterval(() => {
      this.checkActiveSession();
    }, 2000);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.progressValue++;
      this.timer--;

      this.remainingTime = this.timer.toString();

      this.percent = ((15 - this.timer) / 15) * 100;

      if (this.timer < 0) {
        clearInterval(this.timerInterval);

        if (this.nrPlayers <= 0) {
          this.showWarning = true;
          this.deleteSessionSubscription = this.http.delete(`${environment.apiUrl}/GameSession/delete-active-session`).subscribe(() => {
            setTimeout(() => {
              this.router.navigate(['']);
            }, 2000);
          });
        } else {
          this.router.navigate(['/game-init'], { state: { playerCount: this.nrPlayers, id: this.sessionId } });
        }
      }
    }, 1000);
  }

  checkActiveSession() {
    this.activeSessionSubscription = this.http.get<any>(`${environment.apiUrl}/GameSession/active-session`).subscribe(response => {
      this.player1 = response.player1;
      this.player2 = response.player2;
      this.player3 = response.player3;
      this.player4 = response.player4;
      this.nrPlayers = response.nrPlayers;
      this.sessionId = response.gameSessionId;

      if (this.nrPlayers >= 4 && this.timer > 0) {
        clearInterval(this.interval);
        this.router.navigate(['/game-init'], { state: { id: this.sessionId } });
      }
    });
  }
}
