import { Component, ViewChild } from '@angular/core';
import { StudyplanFormComponent } from '../studyplan-form/studyplan-form.component';
import { StudyplanTableComponent } from '../studyplan-table/studyplan-table.component';
import { StudyPlan } from 'src/app/models/study-plan.model';

@Component({
  selector: 'app-studyplan',
  imports: [StudyplanFormComponent, StudyplanTableComponent],
  templateUrl: './studyplan.component.html',
  styleUrl: './studyplan.component.scss'
})
export class StudyplanComponent {
  @ViewChild('formRef') formRef!: StudyplanFormComponent;
  @ViewChild('tableRef') table!: StudyplanTableComponent;
  selectedStudy: StudyPlan | null = null;
  onStudyAdded() {
    this.table.ngOnInit(); // call a method in table to refresh
  }
  onSelectStudy(study: StudyPlan) {
    this.selectedStudy = study;
  }
}
