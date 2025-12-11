import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../../models/exam';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent {
  @Input({ required: true }) questions: Question[] = [];
  @Input() selectedId: number = 0;
  @Input() isVerified: boolean = false;
  @Output() select = new EventEmitter<number>();

  onSelect(id: number) {
    this.select.emit(id);
  }

  isCorrect(q: Question): boolean {
    const normalize = (str: string) =>
      str
        ? str
            .split(',')
            .map((s) => s.trim().toLowerCase())
            .sort()
            .join(',')
        : '';
    return normalize(q.a) === normalize(q.studentAnswer);
  }
}
