import { Injectable } from '@angular/core';
import { Cursos } from '../../shared/models/interfaces';
import { delay, of } from 'rxjs';

const CURSOS_DB: Cursos[] = [
  { 
    id: 2030,
    name: 'Angular',
    description: 'Angular es un Framework de JavaScript de código abierto escrito en TypeScript. Su objetivo principal es desarrollar aplicaciones de una sola página. Google se encarga del mantenimiento y constantes actualizaciones de mejoras para este framework.',
    img: '../../../assets/angular.png'
  },
  {
    id: 2040,
    name: 'ReactJS',
    description: 'React (también llamada React. js o ReactJS) es una librería Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre.',
    img: '../../../assets/react-javascript-js-framework-facebook-icon-1024x911-dnspa9ed.png'
  },
  {
    id: 3030,
    name: 'Matemáticas II',
    description: 'Se utiliza para resolver problemas, detectar patrones y comprobar hipótesis en diferentes áreas, desde la ingeniería hasta la medicina. De hecho, el desarrollo tecnológico actual sería inconcebible sin los aportes de las Matemáticas',
    img: '../../../assets/png-transparent-mathematics-mathematical-notation-symbol-number-computer-icons-mathematics-text-orange-logo.png'
  }
]

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  getCursos() {
    return of(CURSOS_DB).pipe(delay(2000))
  }
}
