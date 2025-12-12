import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question, SubjectsDetailsDto } from '../../models/exam';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-teacher-exam-subjects-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './teacher-exam-subjects-list.component.html',
  styleUrl: './teacher-exam-subjects-list.component.css',
})
export class TeacherExamSubjectsListComponent {
  //GetSubjectsDetailsByExamIdForTeacher
  data: SubjectsDetailsDto = null as any;
  loading = false;
  examId!: string;

  private route = inject(ActivatedRoute);
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private examService: ExamService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    this.loadExam();
  }
  private loadExam(): void {
    this.examService
      .GetSubjectsDetailsByExamIdForTeacher(this.examId)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.isSuccess) {
            this.data = res.data;
          } else {
            this.toastr.error(res.messages.join(', '));
          }
        },
        error: (err) => {
          this.toastr.error(
            'An error occurred while loading exam subjects details.'
          );
          console.error(err);
        },
      });
  }

  onSubjectClick(subject: any) {
    this.router.navigate(['/teacher-exam-subjects-students-list', this.examId, subject.id]);
  }
}
