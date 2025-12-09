import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../../services/exam.service';
import {
  Question,
  StartExamRequest,
  SubmitExamRequest,
} from '../../models/exam';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { TimerComponent } from '../timer/timer.component';
import { TimeoutSubmitDialogComponent } from '../timeout-submit-dialog/timeout-submit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-exam-questions',
  standalone: true,
  imports: [
    FormsModule,
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
    TimerComponent,
    TimeoutSubmitDialogComponent,
  ],
  templateUrl: './student-exam-questions.component.html',
  styleUrl: './student-exam-questions.component.css',
})
export class StudentExamQuestionsComponent implements OnInit {
  questions: Question[] = [];
  loading = false;
  @Input() examId!: string;
  @Input() subjectId!: string;
  totalSecondsToComplete!: number;
  isPageDisabled = false;

  private route = inject(ActivatedRoute);
  constructor(
    private dialog: MatDialog,
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
        this.loading = false;
        if (res.isSuccess) {
          this.questions = res.data.questions;
          this.totalSecondsToComplete = res.data.totalSecondsToComplete;
        } else {
          this.toastr.error(res.messages.join(', '));
          console.error(
            'Failed while generating exam questions:',
            res.messages
          );
          this.router.navigate(['/student-exam-details', this.examId]);
        }
      },
      error: (error) => {
        this.loading = false;
        this.toastr.error('Something went wrong while creating exam.');
        console.error(error);
      },
    });
  }

  onMCMSChange(q: Question, option: string, ev: any) {
    if (!q.studentAnswer) q.studentAnswer = ''; // Converted to string at final stage

    let selected: string[] = q.studentAnswer.split(',').filter((x) => x);

    if (ev.target.checked) {
      selected.push(option);
    } else {
      selected = selected.filter((x) => x !== option);
    }

    q.studentAnswer = selected.join(','); // backend expects comma separated string
  }

  onTimeOver() {
    console.log('Timer ended!');
    this.isPageDisabled = true;

    const dialogRef = this.dialog.open(TimeoutSubmitDialogComponent, {
      disableClose: true, // user cannot close dialog
      backdropClass: 'disabled-backdrop',
    });

    const payload: SubmitExamRequest = {
      ExamId: this.examId,
      SubjectId: this.subjectId,
      Questions: this.questions,
    };

    console.log('Final payload to submit:', payload);

    this.examService.CompleteExamBySubjectId(payload).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.toastr.success('Exam submitted successfully.');
          this.router.navigate(['/thank-you']);
        } else {
          this.toastr.error(res.messages.join(', '));
        }
        this.isPageDisabled = false;
        dialogRef.close();
      },
      error: () => {
        dialogRef.close();
        this.isPageDisabled = false;
        alert('Something went wrong!');
      },
    });
  }
}
