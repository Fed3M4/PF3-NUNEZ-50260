import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumnos } from '../../../../shared/models/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AltaAlumnosComponent } from './components/alta-alumnos/alta-alumnos.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})
export class AlumnosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'phone', 'email', 'delete'];
  dataSource: Alumnos[] = [];
  colorearTabla = false;

  constructor(
    private alumnoService: AlumnosService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe({
      next: (alumnos) => (this.dataSource = alumnos),
    });
  }

  eliminarAlumnos(element: Alumnos): void {
    if(confirm('¿Estas seguro?')){
      this.alumnoService.deleteAlumno(element.id).subscribe({
        next: (alumnos) => {
          this.dataSource = [...alumnos];
        },
      });
    }
  }

  openNewUserModal(): void {
    const dialogRef = this.dialog.open(AltaAlumnosComponent, {
      width: '75vw',
      height: 'auto',
    });
    dialogRef.componentInstance.userSubmitted.subscribe((newUser: Alumnos) => {
      this.alumnoService
        .createAlumno({ ...newUser, id: this.dataSource.length + 1 })
        .subscribe({
          next: (alumnos) => {
            console.log(alumnos);
            this.dataSource = [...alumnos];
          },
          complete: () => {
            this.colorearTabla = true;
          },
        });
    });
  }
}
