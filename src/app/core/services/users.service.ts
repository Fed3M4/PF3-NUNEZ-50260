import { Injectable } from '@angular/core';
import { User } from '../../shared/models/interfaces';
import { Observable, catchError, delay, finalize, map, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AlertService } from './alerts.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {}

  generateString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getAllUsers() {
    this.loadingService.setIsLoading(true)
    return this.httpClient.get<User[]>(`${environment.apiURL}/users`).pipe(delay(1000)).pipe(
      catchError((error) => {
        this.alertService.showError(`Error al cargar los usuarios`);
        return of(error);
      }),
      finalize(()=> this.loadingService.setIsLoading(false))
    );
  }

  getAlumnos(): Observable<User[]> {
    this.loadingService.setIsLoading(true)
    return this.httpClient
      .get<User[]>(`${environment.apiURL}/users`, {
        params: new HttpParams().set('role', 'Alumno'),
      })
      .pipe(
        delay(1000),
        catchError((error) => {
          this.alertService.showError(`Error al cargar los usuarios`);
          return of(error);
        }),
        finalize(()=> this.loadingService.setIsLoading(false))
      );
  }

  getProfesores(): Observable<User[]> {
    this.loadingService.setIsLoading(true)
    return this.httpClient
      .get<User[]>(`${environment.apiURL}/users`, {
        params: new HttpParams().set('role', 'Profesor'),
      })
      .pipe(
        delay(1000),
        catchError((error) => {
          this.alertService.showError(`Error al cargar los usuarios`);
          return of(error);
        }),
        finalize(()=> this.loadingService.setIsLoading(false))
      );
  }

  getUserByEmailAndPassword(
    email: string,
    password: string
  ): Observable<User | null> {
    return this.httpClient
      .get<User[]>(`${environment.apiURL}/users`, {
        params: new HttpParams().set('email', email).set('password', password),
      })
      .pipe(
        map((users: User[]) => {
          const foundUser = users.find(
            (user) => user.email === email && user.password === password
          );
          return foundUser ? foundUser : null;
        }),
        catchError((error) => {
          console.error('Error al obtener usuario:', error);
          return of(null);
        })
      );
  }

  createUser(payload: User) {
    return this.httpClient
      .post<User[]>(`${environment.apiURL}/users`, {...payload, token: this.generateString(15)})
      .pipe(
        catchError((error) => {
          this.alertService.showError(`Error al crear usuario`);
          return of(error);
        })
      );
  }

  deleteUser(userID: number): Observable<User[]> {
    return this.httpClient
      .delete<User[]>(`${environment.apiURL}/users/${userID}`)
      .pipe(
        catchError((error) => {
          this.alertService.showError(`Error al eliminar usuario`);
          return of(error);
        })
      );
  }

  getUserByID(id: number): Observable<User> {
    this.loadingService.setIsLoading(true)
    return this.httpClient.get<User>(`${environment.apiURL}/users/${id}`)
    .pipe(delay(1000))
    .pipe(
      catchError((error) => {
        this.alertService.showError(`Error al cargar usuario`);
        return of(error);
      }),
      finalize(()=> this.loadingService.setIsLoading(false))
    );
  }
}
