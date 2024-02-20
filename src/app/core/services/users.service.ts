import { Injectable } from '@angular/core';
import { User } from '../../shared/models/interfaces';
import {
  Observable,
  catchError,
  delay,
  finalize,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { AlertService } from './alerts.service';
import { LoadingService } from './loading.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}

  getAllUsers() {
    return this.httpClient.get<User[]>(`${enviroment.apiURL}/users`)
  }

  getAlumnos(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${enviroment.apiURL}/users`, {
      params: new HttpParams().set('role', 'Alumno'),
    });
  }

  getProfesores(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${enviroment.apiURL}/users`, {
      params: new HttpParams().set('role', 'Profesor'),
    });
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<User | null> {
    return this.httpClient.get<User[]>(`${enviroment.apiURL}/users`, {
      params: new HttpParams().set('email', email).set('password', password),
    }).pipe(
      map((users: User[]) => {
        const foundUser = users.find(user => user.email === email && user.password === password);
        return foundUser ? foundUser : null;
      }),
      catchError(error => {
        console.error('Error al obtener usuario:', error);
        return of(null);
      })
    );
  }

  createUser(payload: User): Observable<User[]> {
    return this.httpClient.post<User[]>(`${enviroment.apiURL}/users`, payload);
  }

  deleteUser(userID: number): Observable<User[]> {
    return this.httpClient.delete<User[]>(
      `${enviroment.apiURL}/users/${userID}`
    );
  }

  getUserByID(id: number): Observable<User> {
    return this.httpClient.get<User>(`${enviroment.apiURL}/users/${id}`);
  }
}
