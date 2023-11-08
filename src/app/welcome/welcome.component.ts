import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private activeSessionSubscription: Subscription | undefined;
  private interval: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.checkActiveSession();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.activeSessionSubscription) {
      this.activeSessionSubscription.unsubscribe();
    }

    clearInterval(this.interval);
  }

  checkActiveSession() {
    this.activeSessionSubscription = this.http.get<any>(`${environment.apiUrl}/GameSession/active-session`).subscribe(
      response => {
        if (response.isActive && !this.router.url.includes('/select-player')) {
          this.router.navigate(['/select-player']);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.error('Bad request error:', error);
        } else {
          console.error('Error:', error);
        }
      }
    );
  }
}
