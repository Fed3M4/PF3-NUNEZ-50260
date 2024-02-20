import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AltaAlumnosComponent } from './components/alta-alumnos/alta-alumnos.component';
import { UsersService } from '../../../../core/services/users.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})
export class AlumnosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'phone', 'email', 'delete'];
  dataSource: User[] = [];
  colorearTabla = false;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.usersService.getAlumnos().subscribe({
      next: (alumnos) => (this.dataSource = alumnos),
    });
  }

  eliminarAlumnos(element: User): void {
    if(confirm('¿Estas seguro?')){
      this.usersService.deleteUser(element.id).subscribe({
        next: () => {
          this.usersService.getAlumnos().subscribe({
            next: (alumnos) => {
              this.dataSource = [...alumnos];
            },
          })
        }
      });
    }
  }

  openNewUserModal(): void {
    const dialogRef = this.dialog.open(AltaAlumnosComponent, {
      width: '75vw',
      height: 'auto',
    });
    dialogRef.componentInstance.userSubmitted.subscribe((newUser: User) => {
      this.usersService
        .createUser({ ...newUser, id: this.dataSource[this.dataSource.length - 1].id + 1, isActive: true, role: 'Alumno' })
        .subscribe({
          next: () => {
            this.usersService.getAlumnos().subscribe({
              next: (alumnos) => {
                this.dataSource = alumnos;
                this.colorearTabla = true;
              },
              error: (error) => {
                console.error('Error al obtener los alumnos:', error);
              }
            });
          },
          error: (error) => {
            console.error('Error al crear el usuario:', error);
          }
        });
    });
  }
}
