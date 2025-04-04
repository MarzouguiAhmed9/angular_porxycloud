import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component'; // Adjust the path if necessary

const routes: Routes = [
  { path: '', component: CategoryComponent } // Load CategoryComponent when navigating to /category
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Using forChild since it's a feature module
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
