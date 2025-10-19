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
    const userRole = decoded?.Role;
    const allowedRoles = route.data['roles'] as string[];

    if (allowedRoles.includes(userRole)) {
      return true;
    }

    // redirect if not authorized
    this.router.navigate(['/login']);
    return false;
  }
}
