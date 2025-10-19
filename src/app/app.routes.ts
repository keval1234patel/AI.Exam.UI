import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationComponent, canActivate: [AuthGuard] },
  
  { path: 'student-dashboard', 
    loadComponent: () => import('./components/student-dashboard/student-dashboard.component')
    .then(m => m.StudentDashboardComponent), canActivate: [AuthGuard], data: { role: 'Student' } },
  { path: 'teacher-dashboard', 
    loadComponent: () => import('./components/teacher-dashboard/teacher-dashboard.component')
    .then(m => m.TeacherDashboardComponent), canActivate: [AuthGuard], data: { role: 'Teacher' } },
];
