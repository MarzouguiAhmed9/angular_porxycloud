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
  editMode = false;
  editingDepartmentId: number | null = null;

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
      const formData = this.departmentForm.value;

      if (this.editMode && this.editingDepartmentId !== null) {
        const updatedDepartment: Department = {
          idDepartment: this.editingDepartmentId,
          ...formData
        };

        this.departmentService.updateDepartment(updatedDepartment).subscribe({
          next: (updated) => {
            const index = this.departments.findIndex(dep => dep.idDepartment === updated.idDepartment);
            if (index !== -1) this.departments[index] = updated;
            this.resetForm();
          },
          error: (err) => console.error('Error updating department', err)
        });
      } else {
        this.departmentService.addDepartment(formData).subscribe({
          next: (dep) => {
            this.departments.push(dep);
            this.resetForm();
          },
          error: (err) => console.error('Error adding department', err)
        });
      }
    }
  }

  deleteDepartment(id: number): void {
    this.departmentService.deleteDepartment(id).subscribe({
      next: () => {
        this.departments = this.departments.filter(dep => dep.idDepartment !== id);
        if (this.editingDepartmentId === id) this.resetForm();
      },
      error: (err) => console.error('Error deleting department', err)
    });
  }

  onEdit(dep: Department): void {
    this.editMode = true;
    this.editingDepartmentId = dep.idDepartment;
    this.departmentForm.patchValue({
      name: dep.name,
      description: dep.description
    });
  }

  resetForm(): void {
    this.departmentForm.reset();
    this.editMode = false;
    this.editingDepartmentId = null;
  }
}
