import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import {
  RegistrationRequest,
  RegistrationService,
  RegistrationTokenPayload,
} from '../registration/registration.service';
import { LoginService } from './login.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../services/notification.service';

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
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.invalid) return;

    const payload: RegistrationRequest = this.loginForm.value;

    this.loginService.login(payload).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          const decoded = jwtDecode<RegistrationTokenPayload>(res.data);
          this.authService.saveAuthData(res.data, decoded);
          this.notificationService.showSuccess('Login successful');
          console.log('Stored user:', this.authService.getUser());
          const role = this.authService.getUserRole();
          if (role === 'Admin') {
            this.router.navigate(['/teacher-dashboard']);
          } else {
            this.router.navigate(['/student-dashboard']);
          }
        } else {
          this.errorMessage = res.messages[0];
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed';
        console.error('Login error:', err);
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
