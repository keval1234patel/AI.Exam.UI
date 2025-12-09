import { Component, OnInit, inject } from '@angular/core';
import { StudentExamSubjectsQandAData } from '../../../models/exam';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../../../services/exam.service';
import { ExamHeaderComponent } from '../exam-header/exam-header.component';
import { QuestionDetailComponent } from '../question-detail/question-detail.component';
import { QuestionListComponent } from '../question-list/question-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions-answers-details',
  standalone: true,
  imports: [CommonModule, ExamHeaderComponent, QuestionListComponent, QuestionDetailComponent],
  templateUrl: './questions-answers-details.component.html',
  styleUrl: './questions-answers-details.component.css',
})
export class QuestionsAnswersDetailsComponent implements OnInit {
  examId!: string;
  subjectId!: string;
  private route = inject(ActivatedRoute);
  constructor(
    private router: Router,
    private examService: ExamService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    this.subjectId = this.route.snapshot.paramMap.get('subjectId')!;
    this.loadExamData();
  }
  examData: StudentExamSubjectsQandAData = {} as StudentExamSubjectsQandAData;
  selectedQuestionId = 0;
  loadExamData(): void {
    this.examService
      .GetSubjectsQuestionsAndAnswersAfterExamCompletedInViewMode({
        ExamId: this.examId,
        SubjectId: this.subjectId,
      })
      .subscribe({
        next: (response) => {
          console.log('Exam data response:', response);
          if (response.isSuccess) {
            this.examData = response.data;
            this.selectedQuestionId = this.examData.qandA[0]?.id || 1;
          } else {
            this.toastr.error(response.messages.join(', '));
          }
        },
        error: (error) => {
          this.toastr.error('Failed to load exam data');
        },
      });
  }

  get selectedQuestion() {
    return this.examData?.qandA?.find((q) => q.id === this.selectedQuestionId);
  }

  onQuestionSelect(id: number) {
    this.selectedQuestionId = id;
  }
}
