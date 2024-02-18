import { Component, OnInit } from '@angular/core';
import { Curso, User } from '../../../../shared/models/interfaces';
import { LoadingService } from '../../../../core/services/loading.service';
import { CursosService } from '../../../../core/services/cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { CursosSubscribeFormComponent } from './pages/cursos-subscribe-form/cursos-subscribe-form.component';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = []
  usuarios: User[] = []

  constructor(private cursosService: CursosService, private loadingService: LoadingService, private dialog: MatDialog, private usersService: UsersService) {}
  ngOnInit(): void { 
    this.loadingService.setIsLoading(true);
    this.cursosService.getCursos().subscribe({
      next: (cursos) => this.cursos = cursos,
      complete: () => this.loadingService.setIsLoading(false)
    })
    this.usersService.getAllUsers().subscribe({
      next: (users) => this.usuarios = users
    })
   }
 
   openInscriptionModal(curso: Curso): void {
     const dialogRef = this.dialog.open(CursosSubscribeFormComponent, {
       width: '500px',
       data: { curso: curso }
     });
 
    dialogRef.componentInstance.enrolledInCourse.subscribe((newRegistered: any) => {
      this.onEnrolledInCourse(newRegistered)
    });
   }
   onEnrolledInCourse(data: any): void {
    console.log(data)
    const usuarioEncontrado = this.usuarios.find(usuario =>
      usuario.email === data.email && usuario.password === data.password
    );
    const cursoEncontrado = this.cursos.find(curso => curso.name === data.curso);
    if (usuarioEncontrado && cursoEncontrado) {
      cursoEncontrado.alumnosInscriptos.push(usuarioEncontrado.firstName + " " + usuarioEncontrado.lastName);
      console.log(this.cursos)
    } else {
      console.log('Usuario no encontrado.');
    }
  }
}
