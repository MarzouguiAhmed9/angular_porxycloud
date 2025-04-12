import { University } from './university.model';

export class StudyPlan {
  studyPlanId!: number;
  programName!: string;
  programCode!: string;
  durationYears!: number;
  degreeType!: string;
  totalCredits!: number;
  coreCourses!: number;
  languageOfInstruction!: string;
  specialization!: string;
  programDescription!: string;
  prerequisites!: string;
  admissionRequirements!: string;
  thumbnail!: string;
  university!: University;
  startDate!: Date;
  endDate!: Date;
  programWebsite!: string;
}
