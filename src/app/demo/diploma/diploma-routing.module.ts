import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityComponent } from './components/university/university.component';
import { StudyplanComponent } from './components/studyplan/studyplan.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'university',
        component: UniversityComponent
      },
      {
        path: 'studyplan',
        component: StudyplanComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiplomaRoutingModule {}
