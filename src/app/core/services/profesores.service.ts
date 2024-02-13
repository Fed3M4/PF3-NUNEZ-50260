import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Profesor } from '../../shared/models/interfaces';

const PROFESORES_DB: Profesor[] = [
  {id: 1, firstName: 'Laura', lastName: 'Tarangana', phone: 1138459874, email: 'panceres@gmail.com', password: 'racing2023', curso:{id: 2030, name: 'Angular', description:'', img: ''}, isActive: true},
  {id: 2, firstName: 'Roberto', lastName: 'Carlos', phone: 1173959385, email: 'roblos@gmail.com', password: 'mateo2022', curso:{id: 2040, name: 'ReactJS', description:'', img: ''}, isActive: true},
  {id: 3, firstName: 'Ricardo', lastName: 'Fortunato', phone: 1165290665, email: 'rfort@gmail.com', password: 'juegosonline', curso:{id: 3030, name: 'Matemáticas II', description:'', img: ''}, isActive: false}
]

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor() {}

  getProfesores() {
    return of(PROFESORES_DB).pipe(delay(2000))
  }
  getProfesorByEmailAndPassword(email: string, password: string): Profesor | null {
    return PROFESORES_DB.find(profesor => profesor.email === email && profesor.password === password) || null;
  }
}
