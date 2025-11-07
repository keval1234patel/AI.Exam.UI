import { Component, OnInit } from '@angular/core';
import { StudentExam } from '../../models/exam';
import { Router, RouterModule } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-student-exam-list',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIcon,
    RouterModule,
  ],
  templateUrl: './student-exam-list.component.html',
  styleUrls: ['./student-exam-list.component.css'],
})
export class StudentExamListComponent implements OnInit {
  activeExams: StudentExam[] = [];

  constructor(
    private router: Router,
    private examService: ExamService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadActiveExams();
  }

  private loadActiveExams(): void {
    this.examService.GetAllExamsByStudentId().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.activeExams = res.data;
        } else {
          this.toastr.error(res.messages.join(', '));
          console.error('Error fetching exams:', res.messages);
        }
      },
      error: (error) => {
        this.toastr.error('Something went wrong while fetching exams.');
        console.error(error);
      },
    });
  }

  getSubjectCount(exam: StudentExam): number {
    return exam.subjects ? exam.subjects.length : 0;
  }

  onExamClick(exam: StudentExam): void {
    this.router.navigate(['/student-exam-details', exam.id]);
  }

  getSubjectNames(exam: StudentExam): string {
    if (!exam.subjects || exam.subjects.length === 0) return 'No subjects';
    return exam.subjects.map((s: any) => s.subjectName).join(', ');
  }
}
