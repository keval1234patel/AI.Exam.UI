import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { ExamsDetailsDto, NewExamRequestsDto, StudentExam } from '../models/exam';
import { GeneralResponse } from '../models/GeneralResponse';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private baseUrl = `${AppConfig.apiBaseUrl}/Exam`;

  constructor(private http: HttpClient) {}

  createExam(request: NewExamRequestsDto): Observable<GeneralResponse> {
    return this.http.post<GeneralResponse>(`${this.baseUrl}/Create`, request);
  }

  GetAllExamsForTeacherDashboard(): Observable<GeneralResponse<ExamsDetailsDto[]>> {
    return this.http.get<GeneralResponse<ExamsDetailsDto[]>>(
      `${this.baseUrl}/GetAllExamsForTeacherDashboard`
    );
  }

  GetAllExamsByStudentId(): Observable<GeneralResponse<StudentExam[]>> {
    return this.http.get<GeneralResponse<StudentExam[]>>(
      `${this.baseUrl}/GetAllExamsByStudentId`
    );
  }
}
