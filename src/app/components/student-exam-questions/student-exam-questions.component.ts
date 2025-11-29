import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../../services/exam.service';
import { Question, StartExamRequest } from '../../models/exam';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-student-exam-questions',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    CommonModule,
    MatButtonModule,
    MatIcon,
    RouterModule,
  ],
  templateUrl: './student-exam-questions.component.html',
  styleUrl: './student-exam-questions.component.css',
})
export class StudentExamQuestionsComponent implements OnInit {
  questions: Question[] = [];
  loading = false;
  @Input() examId!: string;
  @Input() subjectId!: string;

  private route = inject(ActivatedRoute);
  constructor(
    private router: Router,
    private examService: ExamService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    this.subjectId = this.route.snapshot.paramMap.get('subjectId')!;
    this.loadExam();
  }

  loadExam() {
    this.loading = true;

    const payload: StartExamRequest = {
      ExamId: this.examId,
      SubjectId: this.subjectId,
    };

    this.examService.StartExamBySubjectId(payload).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.questions = res.data;
        } else {
          this.toastr.error(res.messages.join(', '));
          console.error(
            'Failed while generating exam questions:',
            res.messages
          );
        }
      },
      error: (error) => {
        this.toastr.error('Something went wrong while creating exam.');
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
