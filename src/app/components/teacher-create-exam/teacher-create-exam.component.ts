import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../../services/exam.service';
import { Router } from '@angular/router';
import { NewExamRequestsDto } from '../../models/exam';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './teacher-create-exam.component.html',
  styleUrls: ['./teacher-create-exam.component.css'],
})
export class TeacherCreateExamComponent {
  examForm: FormGroup;

  statusList = ['Draft', 'Published'];
  difficultyLevels = ['Easy', 'Medium', 'Hard'];

  constructor(private fb: FormBuilder,
    private examService: ExamService,
    private toastr: ToastrService,
    private router: Router) {
    this.examForm = this.fb.group({
      uniqueExamIdentification: ['', Validators.required],
      domainName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      emailIDs: this.fb.control([]),
      additionalNotes: [''],
      subjects: this.fb.array([this.createSubject()])
    });
  }

  get subjects(): FormArray {
    return this.examForm.get('subjects') as FormArray;
  }

  createSubject(): FormGroup {
    return this.fb.group({
      subjectName: ['', Validators.required],
      difficultyLevel: ['Easy', Validators.required],
      totalQuestions: [0, [Validators.required, Validators.min(1)]],
      totalSecondsToComplete: [0, [Validators.required, Validators.min(1)]],
      additionalNotes: ['']
    });
  }

  addSubject(): void {
    this.subjects.push(this.createSubject());
  }

  removeSubject(index: number): void {
    this.subjects.removeAt(index);
  }


  isInvalid(controlName: string, group?: FormGroup): boolean {
    const formGroup = group || this.examForm;
    const control = formGroup.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onSubmit(): void {
    if (this.examForm.invalid) {
      this.toastr.error('Please fill all required fields.');
      this.examForm.markAllAsTouched();
      return;
    }

    const formValue: NewExamRequestsDto = this.examForm.value;
    this.examService.createExam(formValue).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.toastr.success('Exam created successfully!');
          this.router.navigate(['/teacher-dashboard']);
        } else {
          this.toastr.error(res.messages.join(', '));
        }
      },
      error: (err) => {
        this.toastr.error('Something went wrong while creating the exam.');
        console.error(err);
      }
    });
  }

  saveAsDraft(): void {
    this.toastr.info('Exam saved as draft.');
  }

  // helper: check control validity safely
  isControlInvalid(control: AbstractControl | null): boolean {
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}
