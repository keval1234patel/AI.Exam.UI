import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/app.config';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface RegistrationRequest {
  email: string;
  password: string;
}

export interface RegistrationResponse {
  isSuccess: boolean;
  status: string;
  messages: string[];
  data: string;
}

export interface RegistrationResult {
  rawResponse: RegistrationResponse;
  decodedToken: RegistrationTokenPayload;
}

export interface RegistrationTokenPayload {
  UserId: string;
  Role: 'Student' | 'Teacher';
  EmailId: string;
  exp: number; // expiry timestamp
  iss: string; // issuer
  aud: string; // audience
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = `${AppConfig.apiBaseUrl}/account/register`;

  constructor(private http: HttpClient) {}

  register(payload: RegistrationRequest): Observable<RegistrationResult> {
    return this.http.post<RegistrationResponse>(this.apiUrl, payload).pipe(
      map((response) => {
        console.log('Raw Response from Registration API:', response);
        const decoded = jwtDecode<RegistrationTokenPayload>(response.data);
        return { rawResponse: response, decodedToken: decoded };
      })
    );
  }
}
