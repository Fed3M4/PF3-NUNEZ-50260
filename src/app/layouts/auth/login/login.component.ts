import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../core/services/login.service';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  hide = true;
  loggedInUser: string = '';

  @Output()
  userLogged = new EventEmitter

  constructor(private fb: FormBuilder, private usersService: UsersService, private loginService: LoginService) {
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
    const user = this.usersService.getUserByEmailAndPassword(email, password);
    if (user) {
      this.loginService.setUserName(user.firstName);
      this.loginForm.reset();
      return;
    }
    this.loggedInUser = 'Usuario no encontrado';
    console.log(this.userLogged.toString())
  }
}
