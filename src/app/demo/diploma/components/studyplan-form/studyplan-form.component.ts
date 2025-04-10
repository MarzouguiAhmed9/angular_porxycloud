import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudyplanService } from 'src/app/demo/services/diploma/studyplan-service.service';
import { UniversityService } from 'src/app/demo/services/diploma/university-service.service';
import { StudyPlan } from 'src/app/models/study-plan.model';
import { University } from 'src/app/models/university.model';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-studyplan-form',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './studyplan-form.component.html',
  styleUrl: './studyplan-form.component.scss'
})
export class StudyplanFormComponent {
  studyPlanForm: FormGroup;
  minDate: string;
  universities: University[] = [];

  constructor(
    private universityService: UniversityService,
    private studyService: StudyplanService,
    private fb: FormBuilder
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.studyPlanForm = this.fb.group({
      university: ['', Validators.required],
      programName: ['', [Validators.required, Validators.maxLength(255)]],
      programCode: ['', Validators.maxLength(255)],
      degreeType: ['', [Validators.required, Validators.maxLength(255)]],
      specialization: ['', Validators.maxLength(255)],
      startDate: ['', Validators.required],
      endDate: [''],
      programWebsite: ['', [Validators.pattern('https?://.+')]],
      programDescription: ['', Validators.maxLength(255)],
      prerequisites: ['', Validators.maxLength(255)],
      admissionRequirements: ['', Validators.maxLength(255)],
      languageOfInstruction: ['English', Validators.required],
      coreCourses: ['', [Validators.min(0), Validators.max(100)]],
      totalCredits: ['', [Validators.min(0), Validators.max(500)]],
      durationYears: ['', [Validators.min(5), Validators.max(10)]]
    });
  }

  ngOnInit() {
    this.loadUniversities();
  }
  loadUniversities(): void {
    this.universityService.getAllUniversities().subscribe({
      next: (universities) => {
        this.universities = universities;
      },
      error: (err) => {
        console.error('Failed to load universities', err);
      }
    });
  }
  onSubmit(): void {
    if (this.studyPlanForm.invalid) {
      this.studyPlanForm.markAllAsTouched();
      return;
    }

    const formValue = this.studyPlanForm.value;
    const studyPlan: StudyPlan = {
      programName: formValue.programName,
      programCode: formValue.programCode,
      degreeType: formValue.degreeType,
      specialization: formValue.specialization,
      startDate: new Date(formValue.startDate),
      endDate: formValue.endDate ? new Date(formValue.endDate) : undefined,
      programWebsite: formValue.programWebsite,
      programDescription: formValue.programDescription,
      prerequisites: formValue.prerequisites,
      admissionRequirements: formValue.admissionRequirements,
      languageOfInstruction: formValue.languageOfInstruction,
      coreCourses: Number(formValue.coreCourses),
      totalCredits: Number(formValue.totalCredits),
      durationYears: this.calculateDuration(formValue.startDate, formValue.endDate),
      university: {
        universityId: this.universities.find((u) => u.universityId === parseInt(formValue.university)).universityId || null
      }
    };

    this.studyService.addStudyPlan(studyPlan).subscribe({
      next: (response) => {
        console.log('Study plan created successfully', response);
        this.studyPlanForm.reset();
      },
      error: (error) => {
        console.error('Error creating study plan', error);
      }
    });
  }
  private calculateDuration(startDate: string, endDate: string): number {
    if (!endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInYears = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);

    return parseFloat(diffInYears.toFixed(1));
  }
  getFormControl(controlName: string) {
    return this.studyPlanForm.get(controlName);
  }
}
