import { Component, OnInit } from '@angular/core';
import { Cursos } from '../../../../shared/models/interfaces';
import { LoadingService } from '../../../../core/services/loading.service';
import { CursosService } from '../../../../core/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {
  cursos: Cursos[] = []

  constructor(private cursosService: CursosService, private loadingService: LoadingService) {}
  ngOnInit(): void { 
    this.loadingService.setIsLoading(true);
    this.cursosService.getCursos().subscribe({
      next: (cursos) => this.cursos = cursos,
      complete: () => this.loadingService.setIsLoading(false)
    })
   }
}
