import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { DepartmentService } from '../../../services/department.service';

interface Department {
  idDepartment: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-manage-departments',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, CardComponent],
  templateUrl: './manage-departments.component.html',
  styleUrl: './manage-departments.component.scss'
})
export class ManageDepartmentsComponent implements OnInit {
  departmentForm: FormGroup;
  departments: Department[] = [];

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (res) => this.departments = res,
      error: (err) => console.error('Error loading departments', err)
    });
  }

  addDepartment(): void {
    if (this.departmentForm.valid) {
      this.departmentService.addDepartment(this.departmentForm.value).subscribe({
        next: (dep) => {
          this.departments.push(dep);
          this.departmentForm.reset();
        },
        error: (err) => console.error('Error adding department', err)
      });
    }
  }

  deleteDepartment(id: number): void {
    this.departmentService.deleteDepartment(id).subscribe({
      next: () => this.departments = this.departments.filter(dep => dep.idDepartment !== id),
      error: (err) => console.error('Error deleting department', err)
    });
  }

  onEdit(dep: Department): void {
    console.log('Edit feature not implemented yet', dep);
  }
}
