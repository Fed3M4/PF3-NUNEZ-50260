import { Injectable } from '@angular/core';
import { Curso } from '../../shared/models/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

let CURSOS_DB: Curso[] = [
]

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  constructor(private httpClient: HttpClient) { }

  getCursos() {
    // return of(CURSOS_DB).pipe(delay(2000))
    return this.httpClient.get<Curso[]>(`${environment.apiURL}/courses`)
  }
}
