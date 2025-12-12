import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../../services/exam.service';
import { StudentsSubjectsData, SubjectData } from '../../models/exam';

@Component({
  selector: 'app-teacher-exam-subjects-students-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './teacher-exam-subjects-students-list.component.html',
  styleUrl: './teacher-exam-subjects-students-list.component.css'
})
export class TeacherExamSubjectsStudentsListComponent {
  subjectName = "";
  subjectData: SubjectData | null = null;
  examId!: string;
  subjectId!: string;
  students: StudentsSubjectsData[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private examService: ExamService,
        private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get("examId")!;
    this.subjectId = this.route.snapshot.paramMap.get("subjectId")!;

    this.loadData();
  }

  loadData() {
    this.examService.GetStudentsDetailsBySubjectIdForTeacher(this.examId, this.subjectId).subscribe(res => {
      console.log(res);
      if (res.isSuccess) {
        this.subjectData = res.data;
        this.students = res.data.studentsData;
        this.subjectName = res.data.subjectName;
        this.students = res.data.studentsData.sort(
        (a: any, b: any) => a.emailId.localeCompare(b.emailId)
      );
      } else {
        this.toastr.error(res.messages.join(', '));
      }
    });
  }

  openStudentDetails(emailId: string) {
    this.router.navigate([
      "/teacher-exam-subjects-students-questions-list",
      this.examId,
      this.subjectId,
      emailId
    ]);
  }

}
