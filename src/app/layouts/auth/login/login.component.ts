import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from '../../../core/services/alumnos.service';
import { ProfesoresService } from '../../../core/services/profesores.service';
import { Alumnos, Profesor } from '../../../shared/models/interfaces';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  hide = true;
  // email: string = '';
  // password: string = '';
  loggedInUser: string = '';

  @Output()
  userLogged = new EventEmitter

  constructor(private fb: FormBuilder, private alumnosService: AlumnosService, private profesoresService: ProfesoresService, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)])
    })
  }
  ngOnInit(): void {
    
  }
  loginProfesor() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const alumno = this.alumnosService.getAlumnoByEmailAndPassword(email, password);
    if (alumno) {
      this.loginService.setUserName(alumno.firstName);
      this.loginForm.reset();
      return;
    }
    const profesor = this.profesoresService.getProfesorByEmailAndPassword(email, password);
    if (profesor) {
      this.loginService.setUserName(profesor.firstName);
      this.loginForm.reset();
      return;
    }
    this.loggedInUser = 'Usuario no encontrado';
    console.log(this.userLogged.toString())
  }
}
