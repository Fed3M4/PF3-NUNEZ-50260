import { Injectable } from '@angular/core';
import { LoginData, User } from '../../shared/models/interfaces';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';
import { UsersService } from '../../core/services/users.service';
import { LoginService } from '../../core/services/login.service';
import { AlertService } from '../../core/services/alerts.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/store/auth/actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser: User | null = null;
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private usersService: UsersService,
    private loginService: LoginService,
    private alertService: AlertService,
    private httpClient: HttpClient,
    private store: Store
  ) {}

  private setAuthUser(mockUser: User | null = null): void {
    this.authUser = mockUser;
    if (mockUser) {
      localStorage.setItem('token', mockUser.token);
    } else {
      localStorage.removeItem('token');
    }
  }

  login(data: LoginData): void {
    const email = data.email;
    const password = data.password;
    this.usersService.getUserByEmailAndPassword(email, password).subscribe({
      next: (emailAndPassUser) => {
        if (emailAndPassUser) {
          this.loginService.setUserName(emailAndPassUser.firstName);
          console.log(emailAndPassUser);
          this.setAuthUser(emailAndPassUser);
          this.router.navigate(['dashboard', 'home']);
        } else {
          this.alertService.showError('Email o contraseña inválida');
        }
      },
      error: (error) => {
        console.error('Error al obtener usuario:', error);
        this.alertService.showError('Error al obtener usuario');
      },
    });
  }

  logout(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }

  verifyToken() {
    return this.httpClient
      .get<User[]>(
        `${environment.apiURL}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((response) => {
          if (response.length) {
            this.setAuthUser(response[0]);
            return true;
          } else {
            this.store.dispatch(AuthActions.logout());
            localStorage.removeItem('token');
            return false;
          }
        }),
        catchError(() => of(false))
      );
  }
}
