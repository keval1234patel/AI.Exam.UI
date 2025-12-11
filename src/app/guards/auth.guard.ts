import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUrl = state.url;

    const token = this.authService.getToken();

     // ✅ If logged in and trying to access login/register, redirect to dashboard
    if (this.authService.isAuthenticated() && (currentUrl === '/login' || currentUrl === '/register')) {
      const decoded = this.authService.decodeToken(token!);
      const roles = decoded?.Roles;

      if (roles === 'Teacher') {
        this.router.navigate(['/teacher-dashboard']);
      } else if (roles === 'Student') {
        this.router.navigate(['/student-dashboard']);
      }
      return false;
    }

    if (!this.authService.isAuthenticated() && !(currentUrl === '/login' || currentUrl === '/register')) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
