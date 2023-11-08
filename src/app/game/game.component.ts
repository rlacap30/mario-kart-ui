import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  progress: number = 0;
  timer: number = 10; //game duration
  private timerInterval: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    const initialTime = this.timer;
    this.timerInterval = setInterval(() => {
      this.timer--;

      this.progress = (1 - this.timer / initialTime) * 100;

      if (this.timer < 0) {
        clearInterval(this.timerInterval);
        this.progress = 100;
        setTimeout(() => {
          this.router.navigate(['/end']);
        }, 1000);       
      }
    }, 1000);
  }
}
