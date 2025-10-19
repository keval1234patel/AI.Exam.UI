import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {
  RegistrationRequest,
  RegistrationService,
  RegistrationTokenPayload,
} from './registration.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.registerForm.valid) {
      const payload: RegistrationRequest = this.registerForm.value;
      this.registrationService.register(payload).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            const decoded = jwtDecode<RegistrationTokenPayload>(res.data);
            this.authService.saveAuthData(res.data, decoded);
            this.notificationService.showSuccess('Registration successful');
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
          this.errorMessage = err.error?.message || 'Registration failed';
          console.error('Registration error:', err);
        },
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
