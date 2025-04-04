import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category.component'; // Import standalone component
import { CategoryRoutingModule } from './category-routing.module'; // Import the routing module



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoryComponent,
    CategoryRoutingModule,
    

  ],
  exports: [CategoryComponent]
})
export class CategoryModule { }
