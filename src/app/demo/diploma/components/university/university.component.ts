import { Component, ViewChild } from '@angular/core';
import { UniversityFormComponent } from '../university-form/university-form.component';
import { UniversityTableComponent } from '../university-table/university-table.component';
import { University } from 'src/app/models/university.model';

@Component({
  selector: 'app-university',
  imports: [UniversityTableComponent, UniversityFormComponent],
  templateUrl: './university.component.html',
  styleUrl: './university.component.scss'
})
export class UniversityComponent {
  @ViewChild('formRef') formRef!: UniversityFormComponent;
  @ViewChild('tableRef') table!: UniversityTableComponent;
  selectedUniversity: University | null = null;

  onUniversityAdded() {
    this.table.ngOnInit(); // call a method in table to refresh
  }
  onSelectUniversity(university: University) {
    this.selectedUniversity = university;
  }
}
