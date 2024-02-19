import { Injectable } from '@angular/core';
import { User } from '../../shared/models/interfaces';
import {
  Observable,
  delay,
  finalize,
  of,
  tap,
} from 'rxjs';
import { AlertService } from './alerts.service';
import { LoadingService } from './loading.service';

let USERS_DB: User[] = [
  {
    id: 1,
    firstName: 'Leandro',
    lastName: 'Ramis',
    phone: 1138459874,
    email: 'leandro@gmail.com',
    password: 'racing2023',
    isActive: true,
    curso: 'Angular',
    role: 'Alumno',
  },
  {
    id: 2,
    firstName: 'Alejandro',
    lastName: 'Tarutani',
    phone: 1173959385,
    email: 'atarutani@gmail.com',
    password: 'mateo2022',
    isActive: true,
    curso: 'ReactJS',
    role: 'Alumno',
  },
  {
    id: 3,
    firstName: 'Lucas',
    lastName: 'Nabarro',
    phone: 1165290665,
    email: 'lucas@gmail.com',
    password: 'juegosonline',
    isActive: true,
    curso: 'Angular',
    role: 'Alumno',
  },
  {
    id: 4,
    firstName: 'Test',
    lastName: 'Eando',
    phone: 999999999,
    email: 'test@gmail.com',
    password: '12345678',
    isActive: true,
    curso: 'ReactJS',
    role: 'ADMIN',
  },
  {
    id: 5,
    firstName: 'Laura',
    lastName: 'Tarangana',
    phone: 1138459874,
    email: 'panceres@gmail.com',
    password: 'racing2023',
    curso: 'Angular',
    isActive: true,
    role: 'Profesor',
  },
  {
    id: 6,
    firstName: 'Roberto',
    lastName: 'Carlos',
    phone: 1173959385,
    email: 'roblos@gmail.com',
    password: 'mateo2022',
    curso: 'ReactJS',
    isActive: true,
    role: 'Profesor',
  },
  {
    id: 7,
    firstName: 'Ricardo',
    lastName: 'Fortunato',
    phone: 1165290665,
    email: 'rfort@gmail.com',
    password: 'juegosonline',
    curso: 'Matemáticas II',
    isActive: false,
    role: 'Profesor',
  },
];

@Injectable({
    providedIn: 'root'
})
export class UsersService {
  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService
  ) {}

  getAllUsers() {
    this.loadingService.setIsLoading(true);
    return of(USERS_DB).pipe(
      delay(1000),
      finalize(() => this.loadingService.setIsLoading(false))
    );
  }

  getAlumnos() {
    let alumnos = USERS_DB.filter((users) => users.role == 'Alumno')
    this.loadingService.setIsLoading(true);
    return of(alumnos).pipe(
          delay(1000),
          finalize(() => this.loadingService.setIsLoading(false))
        )
  }

  getProfesores() {
    this.loadingService.setIsLoading(true);
    return of(
        USERS_DB.filter(
            (users) => users.role === 'Profesor'
            ) || null
        ).pipe(
          delay(1000),
          finalize(() => this.loadingService.setIsLoading(false))
        )
  }

  getUserByEmailAndPassword(email: string, password: string): User | null {
    return (
      USERS_DB.find(
        (user) => user.email === email && user.password === password
      ) || null
    );
  }

  createUser(payload: User) {
    USERS_DB.push(payload);
    return this.getAllUsers();
  }

  deleteUser(userID: number) {
    this.loadingService.setIsLoading(true);
    USERS_DB = USERS_DB.filter((alumno) => alumno.id !== userID);
    return this.getAllUsers().pipe(
      tap(() => {
        this.alertService.showSucces('Realizado', 'Se elimino correctamente');
      })
    );
  }

  getUserByID(id: number): Observable<User> {
    const alumno = USERS_DB.find((alumno) => alumno.id == id);
    if (alumno) {
      this.loadingService.setIsLoading(true);
      return of(alumno).pipe(
        delay(1000),
        finalize(() => this.loadingService.setIsLoading(false))
      );
    } else {
      throw this.alertService.showError(
        `No se encontró ningún alumno con el ID ${id}`
      );
    }
  }
}
