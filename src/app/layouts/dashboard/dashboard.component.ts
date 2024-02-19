import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';
import { LoginService } from '../../core/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../core/services/alerts.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  user?: string;
  isLoading = false;
  isLoggedIn = false;

  constructor(
    private loadingService: LoadingService,
    private loginService: LoginService,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.loadingService.isLoading$.subscribe({
      next: (value) => {
        setTimeout(() => {
          this.isLoading = value;
        });
      },
    });
  }
  ngOnInit(): void {
    this.loginService.getUserName().subscribe((userName) => {
      this.user = userName;
      this.userLoggeded();
    });
  }
  userLoggeded(): void {
    if (this.user) {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
    } else {
      this.isLoggedIn = false;
      console.log(this.isLoggedIn);
    }
  }
  logout(): void {
    if (confirm('¿Querés desloguearte?')) {
      this.authService.logout()
      this.user = '';
      this.userLoggeded();
      this.alertService.showSucces('¡Deslogueadoo con éxito!', '¡Hasta la próxima!')
    }
  }
}
