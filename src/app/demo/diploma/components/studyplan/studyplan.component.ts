import { Component } from '@angular/core';
import { StudyplanFormComponent } from "../studyplan-form/studyplan-form.component";
import { StudyplanTableComponent } from "../studyplan-table/studyplan-table.component";

@Component({
  selector: 'app-studyplan',
  imports: [StudyplanFormComponent, StudyplanTableComponent],
  templateUrl: './studyplan.component.html',
  styleUrl: './studyplan.component.scss'
})
export class StudyplanComponent {

}
