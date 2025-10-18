import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  
  // ✅ Protected routes
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'exam', loadComponent: () => import('./components/exam/exam.component').then(m => m.ExamComponent), canActivate: [AuthGuard] },
];
