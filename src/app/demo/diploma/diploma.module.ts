import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudyplanComponent } from './components/studyplan/studyplan.component';
import { UniversityComponent } from './components/university/university.component';
import { DiplomaRoutingModule } from './diploma-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DiplomaRoutingModule, UniversityComponent, StudyplanComponent]
})
export class DiplomaModule {}
