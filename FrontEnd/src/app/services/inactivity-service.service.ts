import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimer: any;
  private secondsRemaining: number = 50;
  private eventSubscriptions: Subscription[] = [];

  constructor(private router: Router) { }

  startTimer(): void {
    if (!localStorage.getItem('token')) {
      return;
    }

    this.inactivityTimer = setInterval(() => {
      this.secondsRemaining--;
      if (this.secondsRemaining === 0) {
        this.resetTimer();
        this.showConfirmationAlert();
      }
    }, 1000);

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart'];
    events.forEach(event => {
      const subscription = fromEvent(document, event).subscribe(() => {
        this.resetTimer();
      });
      this.eventSubscriptions.push(subscription);
    });
  }

  resetTimer(): void {
    clearInterval(this.inactivityTimer);
    this.secondsRemaining = 50;
    this.clearEventSubscriptions();
    this.startTimer();
  }
  
  clearEventSubscriptions(): void {
    this.eventSubscriptions.forEach(subscription => subscription.unsubscribe());
    this.eventSubscriptions = [];
  }

  showConfirmationAlert(): void {
    Swal.fire({
      title: "Oye!",
      text: "Tu sesión está por expirar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Renovar sesión"
    }).then((result) => {
      if (result.isConfirmed) {
        this.startTimer();
      } else {
        this.logout();
      }
    });
  }

  logout(): void {
    this.removeToken();
    this.reloadPage();
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
  }

  reloadPage(): void {
    this.router.navigate(['/Inicio']).then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy() {
    this.clearEventSubscriptions();
  }
}
