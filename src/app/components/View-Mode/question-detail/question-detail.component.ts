import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Question, QUESTION_TYPE_LABELS } from '../../../models/exam';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.css',
})
export class QuestionDetailComponent implements OnChanges {
  @Input({ required: true }) question!: Question;
  @Input() isVerified: boolean = false;

  // Use constants for labels
  typeLabels = QUESTION_TYPE_LABELS;

  isAnswerCorrect = false;
  correctParts: string[] = [];
  studentParts: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['question']) {
      this.calculateStatus();
    }
  }

  get isCodeType() {
    return ['CW', 'COP'].includes(this.question.questionType);
  }

  get displayOptions() {
    // Return explicit options if present, otherwise TF default options
    if (this.question.options && this.question.options.length > 0)
      return this.question.options;
    if (this.question.questionType === 'TF') return ['True', 'False'];
    return [];
  }

  calculateStatus() {
    const normalize = (str: string) =>
      str ? str.split(',').map((s) => s.trim().toLowerCase()) : [];
    this.correctParts = normalize(this.question.a);
    this.studentParts = normalize(this.question.studentAnswer);

    const sortedCorrect = [...this.correctParts].sort().join(',');
    const sortedStudent = [...this.studentParts].sort().join(',');
    this.isAnswerCorrect = sortedCorrect === sortedStudent;
  }

  getOptionClass(opt: string): string {
    const norm = opt.trim().toLowerCase();
    const isSelected = this.studentParts.includes(norm);
    const isCorrect = this.correctParts.includes(norm);

    if (isCorrect && isSelected)
      return 'border-green-500 bg-green-50 text-green-900 shadow-sm';
    if (isCorrect && !isSelected)
      return 'border-green-300 bg-green-50/50 text-green-800 border-dashed';
    if (!isCorrect && isSelected)
      return 'border-red-500 bg-red-50 text-red-900 shadow-sm';
    return 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700';
  }

  getOptionIcon(opt: string): string | null {
    const norm = opt.trim().toLowerCase();
    const isSelected = this.studentParts.includes(norm);
    const isCorrect = this.correctParts.includes(norm);

    if (isCorrect && isSelected) return 'correct-choice';
    if (isCorrect && !isSelected) return 'missed';
    if (!isCorrect && isSelected) return 'wrong';
    return null;
  }
}
