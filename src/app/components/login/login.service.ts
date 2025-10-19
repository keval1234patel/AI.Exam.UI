import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { GeneralResponse } from '../../models/GeneralResponse';
import { AppConfig } from '../../config/app.config';
import {
  RegistrationResult,
  RegistrationTokenPayload,
} from '../registration/registration.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private apiUrl = `${AppConfig.apiBaseUrl}/account/login`;

  login(payload: {
    email: string;
    password: string;
  }): Observable<GeneralResponse> {
    return this.http
      .post<GeneralResponse>(`${this.apiUrl}`, payload)
      .pipe(
        map((response) => {
          console.log('Raw Response from Login API:', response);
          return response;
        })
      );
  }
}
