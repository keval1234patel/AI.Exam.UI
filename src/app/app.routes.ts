import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { TeacherExamListComponent } from './components/teacher-exam-list/teacher-exam-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'student-dashboard',
    loadComponent: () =>
      import('./components/student-dashboard/student-dashboard.component').then(
        (m) => m.StudentDashboardComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] },
  },
  {
    path: 'teacher-dashboard',
    loadComponent: () =>
      import('./components/teacher-dashboard/teacher-dashboard.component').then(
        (m) => m.TeacherDashboardComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Teacher'] },
  //   children: [
  //   { path: '', redirectTo: 'exams', pathMatch: 'full' },
  //   { path: 'exams', component: TeacherExamListComponent },
  // ]
  },
  {
    path: 'teacher-exam-create',
    loadComponent: () =>
      import('./components/teacher-create-exam/teacher-create-exam.component').then(
        (m) => m.TeacherCreateExamComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Teacher'] },
  },
  {
    path: 'student-exam-details/:id',
    loadComponent: () =>
      import('./components/student-exam-subjects-list/student-exam-subjects-list.component').then(
        (m) => m.StudentExamSubjectsListComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student', 'Teacher'] },
  },
  {
    path: 'student-exam-questions/:examId/:subjectId',
    loadComponent: () =>
      import('./components/student-exam-questions/student-exam-questions.component').then(
        (m) => m.StudentExamQuestionsComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student', 'Teacher'] },
  },
  {
    path: 'QandA/:examId/:subjectId',
    loadComponent: () =>
      import('./components/View-Mode/questions-answers-details/questions-answers-details.component').then(
        (m) => m.QuestionsAnswersDetailsComponent
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student', 'Teacher'] },
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
