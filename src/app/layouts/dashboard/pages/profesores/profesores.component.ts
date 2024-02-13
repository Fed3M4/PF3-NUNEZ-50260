import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Profesor } from '../../../../shared/models/interfaces';
import { ProfesoresService } from '../../../../core/services/profesores.service';
import { LoadingService } from '../../../../core/services/loading.service';


@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.scss'
})

export class ProfesoresComponent implements OnInit {
  // value: string = ' '
  dataSource: Profesor[] = [];

  constructor(private profesoresService: ProfesoresService, private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loadingService.setIsLoading(true);
    this.profesoresService.getProfesores().subscribe({
      next: (profesores) => this.dataSource = profesores,
      complete: () => {this.loadingService.setIsLoading(false)}
    })
  }

  displayedColumns: string[] = ['id', 'fullName', 'phone', 'email', 'curso', 'disponible'];
}