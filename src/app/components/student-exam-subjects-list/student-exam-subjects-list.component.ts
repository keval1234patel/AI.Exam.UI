import { Component, Input, OnInit } from '@angular/core';
import { createEmptyStudentExam, StudentExam, StudentExamSubjectsQandAData } from '../../models/exam';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../../services/exam.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-exam-subjects-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './student-exam-subjects-list.component.html',
  styleUrls: ['./student-exam-subjects-list.component.css'],
})
export class StudentExamSubjectsListComponent implements OnInit {
  exam = createEmptyStudentExam();
  @Input() id!: string;
  constructor(
    private router: Router,
    private examService: ExamService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadExam();
  }

  private loadExam(): void {
    this.examService
      .GetSubjectDetailsByExamId(this.id)
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.exam = res.data;
          } else {
            this.toastr.error(res.messages.join(', '));
            console.error('Error fetching subjects:', res.messages);
          }
        },
        error: (error) => {
          this.toastr.error('Something went wrong while fetching subjects details.');
          console.error(error);
        },
      });
  }

  onStartExam(exam: StudentExamSubjectsQandAData): void {
    this.router.navigate(['/student-exam-questions', this.id, exam.id]);
  }

  onViewQandAClick(Subject: StudentExamSubjectsQandAData): void {
    this.router.navigate(['/QandA', this.id, Subject.id]);
  }
}
