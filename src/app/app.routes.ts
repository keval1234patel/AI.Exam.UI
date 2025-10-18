import { Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];
