import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudyplanService } from 'src/app/demo/services/diploma/studyplan-service.service';
import { StudyPlan } from 'src/app/models/study-plan.model';
import { University } from 'src/app/models/university.model';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';
import { UniversityService } from 'src/app/demo/services/diploma/university-service.service';

@Component({
  selector: 'app-studyplan-table',
  imports: [CardComponent, CommonModule],
  templateUrl: './studyplan-table.component.html',
  styleUrl: './studyplan-table.component.scss'
})
export class StudyplanTableComponent implements OnInit {
  universities: University[] = [];
  @Output() selectStudy = new EventEmitter<StudyPlan>();

  constructor(
    private studyService: StudyplanService,
    private univerityService: UniversityService
  ) {}
  studyPlans: StudyPlan[] = [];

  ngOnInit() {
    this.studyService.getAllStudyPlan().subscribe((data) => {
      this.studyPlans = data;
    });
    this.univerityService.getAllUniversities().subscribe((data) => {
      this.universities = data;
    });
  }

  deleteStudyPlan(id: number) {
    if (!confirm('Are you sure you want to delete this university?')) {
      return;
    }
    this.studyService.deleteStudyPlan(id).subscribe(() => {
      this.ngOnInit();
    });
  }
  onEditClick(study: StudyPlan) {
    this.selectStudy.emit(study);
  }
  showStudyPlan(id: number) {
    this.studyService.getStudyPlan(id).subscribe((data) => {
      console.log(data);
    });
  }

  getUniversityName(universityId: number | { universityId: number }): string {
    const university = this.universities.find((uni) => uni.universityId === universityId);
    return university ? university.name : 'Unknown University';
  }
}
