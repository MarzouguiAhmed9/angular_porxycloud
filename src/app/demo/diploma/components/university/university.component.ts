import { Component, ViewChild } from '@angular/core';
import { UniversityFormComponent } from '../university-form/university-form.component';
import { UniversityTableComponent } from '../university-table/university-table.component';

@Component({
  selector: 'app-university',
  imports: [UniversityTableComponent, UniversityFormComponent],
  templateUrl: './university.component.html',
  styleUrl: './university.component.scss'
})
export class UniversityComponent {
  @ViewChild('tableRef') table!: UniversityTableComponent;
  onUniversityAdded() {
    this.table.ngOnInit(); // call a method in table to refresh
  }
}
