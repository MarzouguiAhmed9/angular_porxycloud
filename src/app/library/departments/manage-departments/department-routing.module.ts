import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDepartmentsComponent } from './manage-departments.component'; // Adjust path if needed

const routes: Routes = [
  { path: '', component: ManageDepartmentsComponent } // Default route for /department
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
