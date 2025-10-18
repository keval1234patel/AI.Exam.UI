import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token && !this.authService.isTokenExpired(token)) {
      return true; // ✅ token exists and is valid
    }

    // ❌ Token missing or expired → redirect to login
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
