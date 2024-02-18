import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AltaAlumnosComponent } from './components/alta-alumnos/alta-alumnos.component';
import { UsersService } from '../../../../core/services/users.service';

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
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.usersService.getAlumnos().subscribe({
      next: (alumnos) => (this.dataSource = alumnos),
    });
  }

  eliminarAlumnos(element: User): void {
    if(confirm('¿Estas seguro?')){
      this.usersService.deleteUser(element.id).subscribe({
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
    dialogRef.componentInstance.userSubmitted.subscribe((newUser: User) => {
      this.usersService
        .createUser({ ...newUser, id: this.dataSource.length + 1, isActive: true, role: 'Alumno' })
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
