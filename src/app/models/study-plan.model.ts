
export class StudyPlan {
  studyPlanId?: number;
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
  startDate!: Date;
  endDate!: Date;
  programWebsite!: string;
  university!: { universityId: number } | number;
}


