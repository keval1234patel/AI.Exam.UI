import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import { RegistrationRequest, RegistrationService } from '../registration/registration.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const payload: RegistrationRequest = this.loginForm.value;

    this.loginService.login(payload).subscribe({
      next: (res) => {
        this.authService.saveAuthData(res.rawResponse.data, res.decodedToken);
        this.router.navigate(['/dashboard']);
      },
      error: (err) =>
        (this.errorMessage = err.error?.message || 'Login failed'),
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
