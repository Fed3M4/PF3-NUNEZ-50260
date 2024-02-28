import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup
  hide = true;
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loginService: LoginService
    ) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
  //   if (this.loginForm.invalid) {
  //     this.loginForm.markAllAsTouched();
  //   } else {
  //     this.isLoading = true;
  //     this.authService.login(this.loginForm.value).subscribe({
  //       complete: () => {
  //         this.isLoading = false;
  //       }
  //     });
  //   }
  // }
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
  } else {
    this.authService.login(this.loginForm.value).subscribe()
  }
}
}
