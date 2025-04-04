import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageDepartmentsComponent } from './manage-departments.component'; // Standalone component
import { DepartmentRoutingModule } from './department-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManageDepartmentsComponent,
    DepartmentRoutingModule
  ],
  exports: [ManageDepartmentsComponent]
})
export class DepartmentModule { }
