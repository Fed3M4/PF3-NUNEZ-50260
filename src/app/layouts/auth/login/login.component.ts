import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../core/services/login.service';
import { UsersService } from '../../../core/services/users.service';
import { AuthService } from '../auth.service';
import { AlertService } from '../../../core/services/alerts.service';

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

  constructor(private fb: FormBuilder, private usersService: UsersService, private loginService: LoginService, private authService: AuthService, private alertService: AlertService) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)])
    })
  }
  ngOnInit(): void {
    
  }
  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const user = this.usersService.getUserByEmailAndPassword(email, password);
    if (user) {
      this.loginService.setUserName(user.firstName);
      this.authService.login(user)
      localStorage.setItem('token', 'ksjdh871dh88d7sayd8hda87sd')
      // this.loginForm.reset();
      return;
    }
    this.alertService.showError('Email o contraseña inválida')
  }
}
