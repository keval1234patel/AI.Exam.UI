import { Component, Input } from '@angular/core';
import { StudentExamSubjectsQandAData } from '../../../models/exam';
import { CommonModule, DatePipe } from '@angular/common';
import {
  LucideAngularModule,
  LucideBarChart2,
  LucideCalendar,
  LucideCheckCircle,
  LucideClock,
  LucideTrophy,
  LucideXCircle,
} from 'lucide-angular';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-exam-header',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    DatePipe,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './exam-header.component.html',
  styleUrl: './exam-header.component.css',
})
export class ExamHeaderComponent {
  @Input({ required: true }) data!: StudentExamSubjectsQandAData;

  get duration(): number {
    const start = new Date(this.data.examStartedDateTime).getTime();
    const end = new Date(this.data.examCompletedDateTime).getTime();
    return Math.floor((end - start) / 1000);
  }
}
