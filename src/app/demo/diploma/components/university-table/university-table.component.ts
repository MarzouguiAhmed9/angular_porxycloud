import { Component } from '@angular/core';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';
import { UniversityService } from 'src/app/demo/services/diploma/university-service.service';
import { University } from 'src/app/models/university.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-university-table',
  imports: [CardComponent, CommonModule],
  templateUrl: './university-table.component.html',
  styleUrl: './university-table.component.scss'
})
export class UniversityTableComponent {
  universities: University[] = [];
  constructor(private service: UniversityService) {}
  ngOnInit() {
    this.service.getAllUniversities().subscribe((data) => {
      this.universities = data;
    });
  }
  editUniversity(val: University) {}

  deleteUniversity(id: number) {
    if (!confirm('Are you sure you want to delete this university?')) {
      return;
    }
    this.service.deleteUniversity(id).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }
  showUniversity(id: number) {
    this.service.getUniversity(id).subscribe((data) => {
      console.log(data);
    });
  }
}
