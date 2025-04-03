import { Component } from '@angular/core';
import { UniversityTableComponent } from "../university-table/university-table.component";
import { UniversityFormComponent } from "../university-form/university-form.component";

@Component({
  selector: 'app-university',
  imports: [UniversityTableComponent, UniversityFormComponent],
  templateUrl: './university.component.html',
  styleUrl: './university.component.scss'
})
export class UniversityComponent {

}
