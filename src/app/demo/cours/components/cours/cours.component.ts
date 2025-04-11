import { Component } from '@angular/core';
import { CoursFormComponent } from '../cours-form/cours-form.component';
import { CoursTableComponent } from '../cours-table/cours-table.component';
import { AffectCertificatCoursComponent } from '../affect-certificat-cours/affect-certificat-cours.component';
import { AffectTestCoursComponent } from '../affect-test-cours/affect-test-cours.component';

@Component({
  selector: 'app-cours',
  imports: [CoursFormComponent, CoursTableComponent, AffectTestCoursComponent,AffectCertificatCoursComponent],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.scss'
})
export class CoursComponent {

}
