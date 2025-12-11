import { Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getToken();
    const decoded = this.authService.decodeToken(token!);
    const userRoles = decoded?.Roles;
    const allowedRoles = route.data['roles'] as string[];

    if (allowedRoles.includes(userRoles)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
