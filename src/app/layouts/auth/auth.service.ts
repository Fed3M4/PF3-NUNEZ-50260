import { Injectable } from '@angular/core';
import { LoginData, User } from '../../shared/models/interfaces';
import { Router } from '@angular/router';
import { delay, finalize, map, of, tap } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';
import { UsersService } from '../../core/services/users.service';
import { LoginService } from '../../core/services/login.service';
import { AlertService } from '../../core/services/alerts.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser: User | null = null;
  constructor(private router: Router, private loadingService: LoadingService, private usersService: UsersService, private loginService: LoginService, private alertService: AlertService) {}

  private setAuthUser(mockUser: User | null = null): void {
    this.authUser = mockUser;
    if (mockUser) {
      localStorage.setItem('token', 'ksjdh871dh88d7sayd8hda87sd');
    } else {
      localStorage.removeItem('token');
    }
  }


  // login(userLogged: User | null): void {
  //   this.authUser = userLogged;
  //   this.router.navigate(['dashboard', 'home']);
  // }
  login(data: LoginData): void {
    const email = data.email
    const password = data.password
    const emailAndPassUser = this.usersService.getUserByEmailAndPassword(email, password);
    if(emailAndPassUser){
      this.loginService.setUserName(emailAndPassUser.firstName);
      this.setAuthUser(emailAndPassUser);
      this.router.navigate(['dashboard', 'home']);
    } else {
      this.alertService.showError('Email o contraseña inválida')
    }
  }

  logout(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token')
  }

  verifyToken() {
    this.loadingService.setIsLoading(true);
    return of(localStorage.getItem('token')).pipe(
      delay(1000),
      map((response) => !!response),
      tap(() => this.setAuthUser()),
      finalize(()=> this.loadingService.setIsLoading(false))
    );
  }
}
