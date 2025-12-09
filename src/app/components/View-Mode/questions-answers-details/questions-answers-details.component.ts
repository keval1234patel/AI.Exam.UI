import { Component, OnInit } from '@angular/core';
import { StudentExamSubjectsQandAData } from '../../../models/exam';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router,
    private examService: ExamService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadExamData();
  }
  examData: StudentExamSubjectsQandAData = {} as StudentExamSubjectsQandAData;
  selectedQuestionId = 0;
  loadExamData(): void {
    // Get examId and subjectId from route params
    const examId = this.router.url.split('/').pop() || '';
    const subjectId = this.router.url.split('/').slice(-2, -1)[0] || '';

    this.examService
      .GetSubjectsQuestionsAndAnswersAfterExamCompletedInViewMode({
        ExamId: examId,
        SubjectId: subjectId,
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
    return this.examData.qandA.find((q) => q.id === this.selectedQuestionId);
  }

  onQuestionSelect(id: number) {
    this.selectedQuestionId = id;
  }
}
