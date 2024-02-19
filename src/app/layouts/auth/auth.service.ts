import { Injectable } from '@angular/core';
import { User } from '../../shared/models/interfaces';
import { Router } from '@angular/router';
import { delay, finalize, map, of } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser: User | null = null;
  constructor(private router: Router, private loadingService: LoadingService) {}
  login(userLogged: User | null): void {
    this.authUser = userLogged;
    this.router.navigate(['dashboard', 'home']);
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
      finalize(()=> this.loadingService.setIsLoading(false))
    );
  }
}
