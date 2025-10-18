import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { RegistrationTokenPayload } from '../components/registration/registration.service';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private localStorage: LocalStorageService) {}

  // Save token and decoded user info
  saveAuthData(token: string, user: RegistrationTokenPayload): void {
    this.localStorage.setItem(TOKEN_KEY, token);
    this.localStorage.setItem(USER_KEY, user);
  }

  // Get token
  getToken(): string | null {
    return this.localStorage.getItem<string>(TOKEN_KEY);
  }

  // Get user info
  getUser(): RegistrationTokenPayload | null {
    return this.localStorage.getItem<RegistrationTokenPayload>(USER_KEY);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout user
  logout(): void {
    this.localStorage.removeItem(TOKEN_KEY);
    this.localStorage.removeItem(USER_KEY);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return true;

      const expiryDate = new Date(0);
      expiryDate.setUTCSeconds(decoded.exp);

      return expiryDate < new Date(); // true if expired
    } catch (error) {
      return true; // if decoding fails, treat as expired
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }
}
