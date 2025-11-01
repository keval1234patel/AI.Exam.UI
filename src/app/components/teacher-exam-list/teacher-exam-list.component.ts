import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExamsDetailsDto } from '../../models/exam';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ExamService } from '../../services/exam.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-exam-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './teacher-exam-list.component.html',
  styleUrl: './teacher-exam-list.component.css',
})
export class TeacherExamListComponent implements OnInit {
  activeExams: ExamsDetailsDto[] = [];

  constructor(
    private router: Router,
    private examService: ExamService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.examService.GetAllExamsForTeacherDashboard().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.activeExams = res.data;
          console.log('Fetched Exams:', this.activeExams);
        } else {
          this.toastr.error(res.messages.join(', '));
          console.error('Error fetching exams:', res.messages);
        }
      },
      error: (err) => {
        this.toastr.error('Something went wrong while fetching exams.');
        console.error(err);
      },
    });
  }

  onExamClick(exam: ExamsDetailsDto): void {
    this.router.navigate([
      '/teacher/exam-details',
      exam.id,
    ]);
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomScore(): string {
    return (70 + Math.random() * 15).toFixed(1);
  }
}
