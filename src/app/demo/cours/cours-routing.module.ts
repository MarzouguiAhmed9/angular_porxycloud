import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursComponent } from './components/cours/cours.component';
import { CertificatComponent } from './components/certificat/certificat.component';
import { TestComponent } from './components/test/test.component';
import { UpdateTestComponent } from './components/update-test/update-test.component';
import { UpdateCoursComponent } from './components/update-cours/update-cours.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path:'cours',component:CoursComponent},
      {path:'certificat',component:CertificatComponent},
      {path:'test',component:TestComponent},
      {path:'updatetest/:id',component:UpdateTestComponent},
      {path:'updatecours/:id',component:UpdateCoursComponent},
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursRoutingModule { }
